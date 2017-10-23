import {Injectable} from '@angular/core';

import {OpenWeatherMapService} from "../open-weather-map/open-weather-map.service";
import {WeatherLocationInterface} from "./weather-interface";

/**
 * The weather service is a simple wrapper to wrap any "WeatherApiInterface".
 */
@Injectable()
export class WeatherService {
  constructor(private openWeatherMapService: OpenWeatherMapService) {}

  /**
   * Get the latest weather from the API.
   * @param {WeatherLocationInterface} location - The location where to update the weather.
   * @returns {Promise<WeatherLocationInterface>} The location with the updated weather.
   */
  public updateWeather(location: WeatherLocationInterface): Promise<WeatherLocationInterface> {
    return this.openWeatherMapService.updateWeather(location);
  }

  /**
   * Find a list of locations that match the given "searchTerm".
   * @param {string} searchTerm - The search string to find locations for.
   * @returns {Promise<WeatherLocationInterface[]>} A list of locations that match the given search term.
   */
  public findLocations(searchTerm: string): Promise<WeatherLocationInterface[]> {
    return this.openWeatherMapService.findLocations(searchTerm);
  }

  /**
   * Resets the weather to force a re-pull from the API in case the API uses caching.
   * @returns {Promise<any>}
   */
  public resetWeather(): Promise<any> {
    return this.openWeatherMapService.resetWeather();
  }
}
