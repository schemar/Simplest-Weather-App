import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { OpenWeatherMapService } from "./open-weather-map.service";
import { WeatherLocationInterface } from "./weather-interface";
import {Location} from "./location";

@Injectable()
export class WeatherService {
  constructor(private storage: Storage, private openWeatherMapService: OpenWeatherMapService) {}

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

  storeLocation(location: Location) {
    this.storage.set('location', location)
      .then(function() {console.log('Stored location', location)})
      .catch(function() {console.log('Could not store location', location)});
  }

  getWeather() {
    return this.storage.get('weather');
  }

  storeWeather(weather: WeatherLocationInterface) {
    this.storage.set('weather', weather)
      .then(function() {console.log('Stored location', location)})
      .catch(function() {console.log('Could not store location', location)});
  }

  updateWeather(weather: WeatherLocationInterface) {
    this.openWeatherMapService.updateWeather(weather);
  }
}
