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

    /**
     * LocationForecast constructor
     * @param lat Latitude coordinate of the provided location
     * @param lon Longitude coordinate of the provided location
     * @param data Object with forecast data at the request time ('currently' object); @see https://darksky.net/dev/docs/forecast
     * @param locationName Name of the provided location
     */
    constructor(private lat, private lon, private data, private location) {
        this.latitude = lat;
        this.longitude = lon;
        this.icon = data.icon;
        this.timestamp = data.time;
        this.humidity = data.humidity;
        this.temperature = Number(this.fahrenheitToCelsius(data.temperature).toFixed(1));
        this.location = location;
    }

    /**
     * Convert temperature from Fahrenheit to Celsius
     * @param fahrenheit Temperature in Fahrenheit
     * @returns Temperature in celsius
     */
    fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

}
