import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../services/weather.service';
import { LocationForecast } from 'app/LocationForecast';

/**
 * ForecastComponent
 * Contains a panel view with table and chart representation of weather information for selected location
 */

@Component({
    selector: 'panel',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnDestroy {
    public subscription: Subscription;
    public forecast: LocationForecast;

    // lineChart settings
    public lineChartData: Array<any> = [];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };

    // color parameters
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = false; // hide legend
    public lineChartType = 'line';

    /**
     * Forecast component constructor with injected weather service
     * @param weatherService Weather service for API requests
     */
    constructor(private weatherService: WeatherService) {
        this.subscription = this.weatherService.getForecast()
            .subscribe(data => { // subscribe for weather forecast data from DialogComponent
                this.clearWeatherData();
                this.weatherService.getHourlyForecast(data.latitude, data.longitude).subscribe(
                    response => {
                        this.prepareHourlyForecastData(response);
                        this.forecast = data;
                    },
                    error => console.error(`Error:  ${error}`)
                );
            });
    }

    /**
     * Prepare data for chart view
     * Extract temperature and time values, push the data in the correct chart data arrays
     * @param forecastData Object with weather forecast received from API-service
     */
    prepareHourlyForecastData(forecastData) {
        const temperatureArray: Array<number> = [];

        for (let i = 0; i < forecastData.hourly.data.length; i++) {
            temperatureArray.push(forecastData.hourly.data[i].temperature);
            this.lineChartLabels.push(i);
        }

        this.lineChartData.push({ data: temperatureArray });
    }

    /**
     * Clear forecast data before next weather request
     */
    clearWeatherData() {
        this.forecast = null;
        this.lineChartLabels = [];
        this.lineChartData = [];
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

}
