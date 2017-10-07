import {WeatherLocationInterface} from "./weather-interface";

export interface WeatherApiInterface {
  updateWeather(location: WeatherLocationInterface): Promise<WeatherLocationInterface>;
  findLocations(searchTerm: string): Promise<WeatherLocationInterface[]>;
}
