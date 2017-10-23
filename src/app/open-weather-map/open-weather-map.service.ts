import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

import {WeatherLocationInterface} from "../weather/weather-interface";
import {OpenWeatherMapResponse} from "./open-weather-map-response";
import {Weather} from "../weather/weather";
import {WeatherApiInterface} from "../weather/weather-api-interface";
import {OpenWeatherMapStorageService} from "./open-weather-map-storage.service";

/**
 * An implementation of "WeatherApiInterface" that connects to openweathermap.org.
 */
@Injectable()
export class OpenWeatherMapService implements WeatherApiInterface {
  private urlMethodNow: string = 'weather';
  private urlMethodForecast: string = 'forecast';
  private apiKey: string = '15737c2e295e46d2f02eac5ff71488c8';
  // Either 'like' or 'accurate'
  private locationSearchType: string = 'like';

  private lastUpdateNow: Date = new Date(1970, 1, 1);
  private lastUpdateForecast: Date = new Date(1970, 1, 1);

  constructor(private http: Http, private storage: OpenWeatherMapStorageService) {
    storage.getUpdateNow().then(lastUpdateNow => {
      if (lastUpdateNow !== null) {
        this.lastUpdateNow = new Date(lastUpdateNow);
      }
    });

    storage.getUpdateForecast().then(lastUpdateForecast => {
      if (lastUpdateForecast !== null) {
        this.lastUpdateForecast = new Date(lastUpdateForecast);
      }
    });
  }

  /**
   * Makes an API call to update current and forecast weather.
   * @param {WeatherLocationInterface} location - The location where to get the weather for.
   * @returns {Promise<WeatherLocationInterface>} The location with the updated weather data.
   */
  public updateWeather(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    return this.updateNow(location)
      .then(location => this.updateForecast(location));
  }

  /**
   * Resets all caches and storage so that the weather is forced to be fetched from the API.
   * @returns {Promise<any>}
   */
  public resetWeather(): Promise<any> {
    this.lastUpdateNow = new Date(1970, 1, 1);
    this.lastUpdateForecast = new Date(1970, 1, 1);

    return this.storage.resetUpdates();
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
      })
    });
  }

  private updateNow(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    if (OpenWeatherMapService.getMinutesSince(this.lastUpdateNow) < 10) {
      return new Promise(resolve => {resolve(location)});
    }

    return new Promise(resolve => {
      this.getNow(location).subscribe(locationResponse => {
        location.now = OpenWeatherMapService.createWeatherFromResponse(locationResponse);
        this.lastUpdateNow = new Date();
        this.storage.storeUpdateNow();

        resolve(location)
      });
    });
  }

  private updateForecast(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    if (OpenWeatherMapService.getMinutesSince(this.lastUpdateForecast) < 60) {
      return new Promise(resolve => {resolve(location)});
    }

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

        this.lastUpdateForecast = new Date();
        this.storage.storeUpdateForecast();

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

  private getUrl(method: string, location: WeatherLocationInterface) {
    return 'https://api.openweathermap.org/data/2.5/'+method+'?id='+location.id+'&APPID='+this.apiKey
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

  private static getMinutesSince(since: Date): number {
    return (Date.now() - since.getTime()) / (1000 * 60);
  }
}
