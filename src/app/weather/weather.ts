import {Sky, WeatherInterface, WeatherLocationInterface} from "./weather-interface";

export class WeatherLocation implements WeatherLocationInterface {
  public now: WeatherInterface;
  public soon: WeatherInterface;
  public later: WeatherInterface;
  public tomorrow: WeatherInterface;

  constructor (readonly id: number, readonly name: string, readonly country: string) {
    this.now = new Weather(0, Sky.Unknown);
    this.soon = new Weather(0, Sky.Unknown);
    this.later = new Weather(0, Sky.Unknown);
    this.tomorrow = new Weather(0, Sky.Unknown);
  }
}

export class Weather implements WeatherInterface {
  constructor(readonly temperature: number, readonly sky: Sky) {}
}
