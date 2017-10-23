import {WeatherLocationInterface} from "./weather-interface";

/**
 * Any weather API module should implement this interface to be easily usable within "WeatherService".
 */
export interface WeatherApiInterface {
  updateWeather(location: WeatherLocationInterface): Promise<WeatherLocationInterface>;
  findLocations(searchTerm: string): Promise<WeatherLocationInterface[]>;
  resetWeather(): Promise<any>;
}
