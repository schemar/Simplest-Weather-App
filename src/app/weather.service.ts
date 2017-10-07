import { Injectable } from '@angular/core';

import { OpenWeatherMapService } from "./open-weather-map.service";
import { WeatherLocationInterface } from "./weather-interface";

@Injectable()
export class WeatherService {
  constructor(private openWeatherMapService: OpenWeatherMapService) {}

  public updateWeather(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    return this.openWeatherMapService.updateWeather(location);
  }

  public findLocations(searchTerm: string): Promise<WeatherLocationInterface[]> {
    return this.openWeatherMapService.findLocations(searchTerm);
  }
}
