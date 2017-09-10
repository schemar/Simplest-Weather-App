import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { OpenWeatherMapService } from "./open-weather-map.service";
import { WeatherLocationInterface } from "./weather-interface";

@Injectable()
export class WeatherService {
  constructor(private storage: Storage, private openWeatherMapService: OpenWeatherMapService) {}

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

  storeLocation(location: WeatherLocationInterface) {
    this.storage.set('location', location)
      .then(function() {console.log('Stored location', location)})
      .catch(function() {console.log('Could not store location', location)});
  }

  updateWeather(location: WeatherLocationInterface) {
    this.openWeatherMapService.updateWeather(location);
  }
}
