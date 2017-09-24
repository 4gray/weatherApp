import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../services/weather.service';
import { LocationForecast } from '../LocationForecast';
import { FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * DialogComponent
 * Contains a form with latitude and longitude input fields for weather requests
 */

@Component({
    selector: 'add-location-form',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public loading: boolean = false;
    public weatherForm: FormGroup;

    constructor(private weatherService: WeatherService, private fb: FormBuilder) { }

    ngOnInit(): void {
        // add validation for weather form on component init
        this.weatherForm = this.fb.group({
            'latitude': new FormControl(this.latitude, [
                Validators.required,
                Validators.minLength(1),
                Validators.max(90),
                Validators.min(-90)
            ]),
            'longitude': new FormControl(this.longitude, [
                Validators.required,
                Validators.minLength(1),
                Validators.max(180),
                Validators.min(-180)
            ]),
        });
    }

    /**
     * Get latitude and longitude coordinates for the current user geolocation
     */
    getCurrentLocation() {
        if (navigator.geolocation) {
            this.loading = true;
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.loading = false;
            });
        } else {
            console.error('Sorry, geolocation is not supported by this browser.');
        }
    }


    /**
     * Send data with weather forecast to subscribers via observable subject
     */
    sendForecast(forecastObject): void {
        this.weatherService.sendForecast(forecastObject);
    }

    /**
     * Return location name (city and country) by coordinates
     * @param coordinates Latitude and longitude coordinates
     */
    getLocationNameByLatLon(coordinates) {
        this.loading = true;
        this.weatherService.getLocationNameByLanLon(coordinates.latitude, coordinates.longitude).subscribe(
            response => {
                this.getWeatherByLatLon(coordinates.latitude, coordinates.longitude, response);
            },
            error => {
                console.error(`Error:  ${error}`);
                this.loading = false;
            }
        );
    }

    /**
     * Get weather information and send to the ForecastComponent
     * @param latitude Latitude coordinate of the location
     * @param longitude Longitude coordinate of the location
     * @param location Location title
     */
    getWeatherByLatLon(latitude: number, longitude: number, location: any) {
        this.loading = true;
        this.weatherService.requestWeatherByLatLon(latitude, longitude).subscribe(
            response => {
                const forecast = new LocationForecast(latitude, longitude, response.currently, location || 'Weather forecast');
                this.sendForecast(forecast);
                this.loading = false;
            },
            error => {
                console.error(`Error:  ${error}`);
                this.loading = false;
            }
        );
    }

}
