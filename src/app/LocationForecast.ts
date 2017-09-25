/**
 * Model class, represents weather forecast for the location
 */
export class LocationForecast {
    name: string;
    latitude: number;
    longitude: number;
    temperature: number;
    icon: string;
    timestamp: number;
    humidity: number;
    daily: Array<any>;

    /**
     * LocationForecast constructor
     * @param lat Latitude coordinate of the provided location
     * @param lon Longitude coordinate of the provided location
     * @param todayForecast Object with forecast data at the request time ('currently' object); @see https://darksky.net/dev/docs/forecast
     * @param dailyForecast Array with daily forecast data
     * @param locationName Name of the provided location
     */
    constructor(private lat, private lon, private todayForecast, private location, private dailyForecast) {
        this.latitude = lat;
        this.longitude = lon;
        this.icon = todayForecast.icon;
        this.timestamp = todayForecast.time;
        this.humidity = todayForecast.humidity;
        this.temperature = Number(todayForecast.temperature.toFixed(1));
        this.location = location;
        this.daily = dailyForecast;
        console.log(dailyForecast);
    }



}
