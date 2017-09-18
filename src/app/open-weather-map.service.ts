import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { WeatherLocationInterface } from "./weather-interface";
import { OpenWeatherMapResponse } from "./open-weather-map-response";
import { Weather } from "./weather";
import { Location } from "./location";

@Injectable()
export class OpenWeatherMapService {
  apiKey: string = '15737c2e295e46d2f02eac5ff71488c8';
  // Either 'like' or 'accurate'
  locationSearchType: string = 'like';

  constructor(private http: Http) {}

  updateWeather(weatherLocation: WeatherLocationInterface) {
    this.updateNow(weatherLocation);
    this.updateSoon(weatherLocation);
  }

  updateNow(weatherLocation: WeatherLocationInterface) {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?id='+weatherLocation.id+'&APPID='+this.apiKey).subscribe(function (response) {
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
    this.http.get('https://api.openweathermap.org/data/2.5/forecast?id='+weatherLocation.id+'&APPID='+this.apiKey).subscribe(function (response) {
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

  findLocations(search: string, list: Location[]) {
    this.http.get('https://api.openweathermap.org/data/2.5/find?q='+search+'&type='+this.locationSearchType+'&APPID='+this.apiKey).subscribe(function (response) {
      OpenWeatherMapService.emptyList(list);

      let parsedResponse = response.json();
      parsedResponse.list.forEach(function(location) {console.log(location); list.push(new Location(location.id, location.name, location.sys.country))});
    });
  }

  private static emptyList(list: Location[]) {
    while(list.length > 0) {
      list.pop();
    }
  }
}
