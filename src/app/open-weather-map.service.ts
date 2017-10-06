import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { WeatherLocationInterface } from "./weather-interface";
import { OpenWeatherMapResponse } from "./open-weather-map-response";
import { Weather, WeatherLocation } from "./weather";
import { StorageService } from "./storage.service";

@Injectable()
export class OpenWeatherMapService {
  apiKey: string = '15737c2e295e46d2f02eac5ff71488c8';
  // Either 'like' or 'accurate'
  locationSearchType: string = 'like';

  constructor(private http: Http, private storage: StorageService) {}

  updateWeather(weatherLocation: WeatherLocationInterface) {
    this.updateNow(weatherLocation);
    this.updateForecast(weatherLocation);
  }

  updateNow(weatherLocation: WeatherLocationInterface) {
    let storage = this.storage;
    this.http.get('https://api.openweathermap.org/data/2.5/weather?id='+weatherLocation.id+'&APPID='+this.apiKey).subscribe(function (response) {
      let responseObject = response.json();
      let openWeatherMapsResponse = new OpenWeatherMapResponse();

      openWeatherMapsResponse.main = responseObject.main;
      openWeatherMapsResponse.weather = responseObject.weather;

      weatherLocation.now = new Weather(openWeatherMapsResponse.getTemperature(), openWeatherMapsResponse.getSky());
      storage.storeLocation(weatherLocation);
    });
  }

  updateForecast(weatherLocation: WeatherLocationInterface) {
    let storage = this.storage;

    this.http.get('https://api.openweathermap.org/data/2.5/forecast?id='+weatherLocation.id+'&APPID='+this.apiKey).subscribe(function (response) {
      let responseObject = response.json();

      let now = Math.floor(Date.now() / 1000);

      let localDate = new Date();
      let tomorrowDate = new Date(localDate.getFullYear(),localDate.getMonth(), localDate.getDate() + 1, 13);
      let tomorrowTimestamp = Math.floor(tomorrowDate.getTime() / 1000);

      let soonFound = false;
      let laterFound = false;
      let tomorrowFound = false;
      responseObject.list.forEach((report: OpenWeatherMapResponse) => {
        if (soonFound && laterFound && tomorrowFound) {
          return;
        }

        let differenceInHours = OpenWeatherMapService.differenceInHours(report.dt, now);

        if(differenceInHours >= 2.5 && !soonFound) {
          soonFound = true;

          weatherLocation.soon = OpenWeatherMapService.createWeatherFromReport(report);
        }

        if(differenceInHours >= 5 && !laterFound) {
          laterFound = true;

          weatherLocation.later = OpenWeatherMapService.createWeatherFromReport(report);
        }

        if(report.dt > tomorrowTimestamp && !tomorrowFound) {
          tomorrowFound = true;

          weatherLocation.tomorrow = OpenWeatherMapService.createWeatherFromReport(report);
        }
      });


      storage.storeLocation(weatherLocation);
    });
  }

  findLocations(search: string, list: WeatherLocationInterface[]) {
    this.http.get('https://api.openweathermap.org/data/2.5/find?q='+search+'&type='+this.locationSearchType+'&APPID='+this.apiKey).subscribe(function (response) {
      OpenWeatherMapService.emptyList(list);

      let parsedResponse = response.json();
      parsedResponse.list.forEach(function(location) {
        let newLocation = new WeatherLocation(location.id, location.name, location.sys.country);
        list.push(newLocation);
      });
    });
  }

  private static emptyList(list: WeatherLocationInterface[]) {
    while(list.length > 0) {
      list.pop();
    }
  }

  private static differenceInHours(timestampOne: number, timestampTwo: number): number {
    let differenceInSeconds = Math.abs(timestampOne - timestampTwo);
    let secondsPerHour = 60 * 60;

    return differenceInSeconds / secondsPerHour;
  }

  private static createWeatherFromReport(report: OpenWeatherMapResponse): Weather {
    let openWeatherMapsResponse = new OpenWeatherMapResponse();
    openWeatherMapsResponse.main = report.main;
    openWeatherMapsResponse.weather = report.weather;

    return new Weather(openWeatherMapsResponse.getTemperature(), openWeatherMapsResponse.getSky());
  }
}
