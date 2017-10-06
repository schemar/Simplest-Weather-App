import { Injectable } from '@angular/core';

import { OpenWeatherMapService } from "./open-weather-map.service";
import { WeatherLocationInterface } from "./weather-interface";

@Injectable()
export class WeatherService {
  constructor(private openWeatherMapService: OpenWeatherMapService) {}

  updateWeather(weather: WeatherLocationInterface) {
    this.openWeatherMapService.updateWeather(weather);
  }
}
