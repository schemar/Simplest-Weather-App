import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { WeatherLocationInterface } from "./weather-interface";
import { OpenWeatherMapResponse } from "./open-weather-map-response";
import { Weather, WeatherLocation } from "./weather";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {WeatherApiInterface} from "./weather-api-interface";

@Injectable()
export class OpenWeatherMapService implements WeatherApiInterface {
  private urlMethodNow: string = 'weather';
  private urlMethodForecast: string = 'forecast';
  private apiKey: string = '15737c2e295e46d2f02eac5ff71488c8';
  // Either 'like' or 'accurate'
  private locationSearchType: string = 'like';

  constructor(private http: Http) {}

  public updateWeather(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    let updatedLocation = new WeatherLocation(location.id, location.name, location.country);

    return this.updateNow(updatedLocation)
      .then(updatedLocation => this.updateForecast(updatedLocation));
  }

  public findLocations(search: string): Promise<WeatherLocationInterface[]> {
    return new Promise(resolve => {
      this.getLocationList(search).subscribe(locationsResponse => {
            let list: WeatherLocationInterface[] = [];

          locationsResponse.forEach(locationResponse => {
              list.push(
                OpenWeatherMapResponse.toWeatherLocation(locationResponse)
              );
            });

            resolve(list);
          }
        )
    });
  }

  private updateNow(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    return new Promise(resolve => {
      this.getNow(location).subscribe(locationResponse => {
        location.now = OpenWeatherMapService.createWeatherFromResponse(locationResponse);

        resolve(location)
      });
    });
  }

  private updateForecast(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    return new Promise(resolve => {
      this.getForecast(location).subscribe(locationsResponse => {
        let now = Math.floor(Date.now() / 1000);
        let tomorrowTimestamp = OpenWeatherMapService.getTomorrowTimestamp();

        let soonFound = false;
        let laterFound = false;
        let tomorrowFound = false;
        locationsResponse.forEach(locationResponse => {
          if (soonFound && laterFound && tomorrowFound) {
            return;
          }

          let differenceInHours = OpenWeatherMapService.differenceInHours(locationResponse.dt, now);

          if(differenceInHours >= 2.5 && !soonFound) {
            soonFound = true;
            location.soon = OpenWeatherMapService.createWeatherFromResponse(locationResponse);
          }

          if(differenceInHours >= 5 && !laterFound) {
            laterFound = true;
            location.later = OpenWeatherMapService.createWeatherFromResponse(locationResponse);
          }

          if(locationResponse.dt > tomorrowTimestamp && !tomorrowFound) {
            tomorrowFound = true;
            location.tomorrow = OpenWeatherMapService.createWeatherFromResponse(locationResponse);
          }
        });

        resolve(location)
      });
    });
  }

  private getNow(location: WeatherLocationInterface): Observable<OpenWeatherMapResponse> {
    return this.http
      .get(this.getUrl(this.urlMethodNow, location))
      .map(response => response.json() as OpenWeatherMapResponse)
  }

  private getForecast(location: WeatherLocationInterface): Observable<OpenWeatherMapResponse[]> {
    return this.http
      .get(this.getUrl(this.urlMethodForecast, location))
      .map(response => response.json().list as OpenWeatherMapResponse[]);
  }

  private getLocationList(searchTerm: string): Observable<OpenWeatherMapResponse[]> {
    return this.http
      .get('https://api.openweathermap.org/data/2.5/find?q=' + searchTerm + '&type=' + this.locationSearchType + '&APPID=' + this.apiKey)
      .map(response => response.json().list as OpenWeatherMapResponse[]);
  }

  private static differenceInHours(timestampOne: number, timestampTwo: number): number {
    let differenceInSeconds = Math.abs(timestampOne - timestampTwo);
    let secondsPerHour = 60 * 60;

    return differenceInSeconds / secondsPerHour;
  }

  private static createWeatherFromResponse(response: OpenWeatherMapResponse): Weather {
    return new Weather(
      OpenWeatherMapResponse.getTemperature(response),
      OpenWeatherMapResponse.getSky(response)
    );
  }

  private static getTomorrowTimestamp(): number {
    let localDate = new Date();
    let tomorrowDate = new Date(localDate.getFullYear(),localDate.getMonth(), localDate.getDate() + 1, 13);
    return Math.floor(tomorrowDate.getTime() / 1000);
  }

  private getUrl(method: string, location: WeatherLocationInterface) {
    return 'https://api.openweathermap.org/data/2.5/'+method+'?id='+location.id+'&APPID='+this.apiKey
  }
}
