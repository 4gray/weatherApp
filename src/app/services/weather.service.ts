import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { LocationForecast } from 'app/LocationForecast';

/**
 * WeatherService
 * Weather service is responsible for the weather forecast API requests and communication between Dialog and Forecast components
 * @see https://darksky.net/dev/docs#forecast-request
 */

@Injectable()
export class WeatherService {
    private subject = new Subject<any>();
    private API_KEY = '2f3819b2795ac93d947ceed9797ef3af';
    private REQUEST_URI = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + this.API_KEY + '/';
    private GEOSERVICE_URI = 'http://api.geonames.org/findNearbyPlaceNameJSON?username=weatherapp';

    constructor(private http: Http) { }

    /**
     * Get weather forecast by latitude and longitude
     * @param latitude Latitude coordinate of the location
     * @param longitude Longitude coordinate of the location 
     */
    requestWeatherByLatLon(latitude: number, longitude: number) {
        const requestUrl = this.REQUEST_URI + latitude + ',' + longitude;
        return this.http.get(requestUrl)
            .map(response => response.json())
            .map(data => {
                return data;
            })
            .catch(this.handleError);
    }

    /**
     * Get name of the location (city and country) by the latitude and longitude coordinate
     * @see http://www.geonames.org/export/JSON-webservices.html
     * @param latitude Latitude coordinate of the location
     * @param longitude Longitude coordinate of the location
     */
    getLocationNameByLanLon(latitude: number, longitude: number) {
        const requestUrl = this.GEOSERVICE_URI + '&lat=' + latitude + '&lng=' + longitude;
        return this.http.get(requestUrl)
            .map(response => response.json())
            .map(response => {
                if (response.geonames[0]) {
                    return response.geonames[0].name + ', ' + response.geonames[0].countryName;
                }
            })
            .catch(this.handleError);
    }

    /**
     * Get hourly forecast for today by the latitude and longitude
     * @see https://darksky.net/dev/docs#forecast-request
     * @param latitude Latitude coordinate of the location
     * @param longitude Longitude coordinate of the location
     */
    getHourlyForecast(latitude: number, longitude: number) {
        const timestamp = Math.floor(Date.now() / 1000);
        const requestUrl = this.REQUEST_URI
            + latitude + ','
            + longitude + ','
            + timestamp
            + '?exclude=currently,daily,flags&units=ca';

        return this.http.get(requestUrl)
            .map(response => response.json())
            .map(data => data)
            .catch(this.handleError);
    }

    /**
     * Error handling
     * @param err Error object
     */
    private handleError(err) {
        let errMessage: string;
        let result: string;

        if (err instanceof Response) {
            const body = err.json() || '';
            const error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
            result = body.message;
        } else {
            errMessage = err.message ? err.message : err.toString();
            result = errMessage;
        }

        console.error(errMessage);
        return Observable.throw(result || 'Ups, something went wrong :(');
    }

    /**
     * Send method for the communication between components
     * @param forecast Forecast data object
     */
    sendForecast(forecast: LocationForecast) {
        this.subject.next(forecast);
    }

    /**
     * Get method for the communication between components
     */
    getForecast(): Observable<any> {
        return this.subject.asObservable();
    }

}
