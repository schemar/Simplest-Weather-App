import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { WeatherLocationInterface } from "./weather-interface";
import { OpenWeatherMapResponse } from "./open-weather-map-response";
import {Weather} from "./weather";

@Injectable()
export class OpenWeatherMapService {
  apiKey: string = '15737c2e295e46d2f02eac5ff71488c8';

  constructor(private http: Http) {}

  updateWeather(weatherLocation: WeatherLocationInterface) {
    this.updateNow(weatherLocation);
    this.updateSoon(weatherLocation);
  }

  updateNow(weatherLocation: WeatherLocationInterface) {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+weatherLocation.name+'&APPID='+this.apiKey).subscribe(function (response) {
      let responseObject = response.json();
      let openWeatherMapsResponse = new OpenWeatherMapResponse();

      openWeatherMapsResponse.main = responseObject.main;
      openWeatherMapsResponse.weather = responseObject.weather;

      let weather = new Weather();
      weather.temperature = openWeatherMapsResponse.getTemperature();
      weather.sky = openWeatherMapsResponse.getSky();

      weatherLocation.now = weather;
    });
  }

  updateSoon(weatherLocation: WeatherLocationInterface) {
    this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='+weatherLocation.name+'&APPID='+this.apiKey).subscribe(function (response) {
      let responseObject = response.json();
      let openWeatherMapsResponse = new OpenWeatherMapResponse();

      openWeatherMapsResponse.main = responseObject.list[0].main;
      openWeatherMapsResponse.weather = responseObject.list[0].weather;

      let weather = new Weather();
      weather.temperature = openWeatherMapsResponse.getTemperature();
      weather.sky = openWeatherMapsResponse.getSky();

      weatherLocation.soon = weather;
    });
  }
}
