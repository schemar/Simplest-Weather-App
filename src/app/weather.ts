import { Sky, WeatherInterface, WeatherLocationInterface } from "./weather-interface";

export class WeatherLocation implements WeatherLocationInterface {
  id: string;
  name: string;
  now: WeatherInterface;
  soon: WeatherInterface;
  later: WeatherInterface;
  tomorrow: WeatherInterface;

  constructor () {
    this.name = 'weathering';
    this.now = new Weather();
    this.soon = new Weather();
  }

  deserialize(input): WeatherLocation {
    input = input || new WeatherLocation();

    this.id = input.id;
    this.name = input.name;
    this.now = new Weather().deserialize(input.now);
    this.soon = new Weather().deserialize(input.soon);
    this.later = new Weather().deserialize(input.later);
    this.tomorrow = new Weather().deserialize(input.tomorrow);

    return this;
  }
}

export class Weather implements WeatherInterface {
  temperature: number;
  sky: Sky;

  constructor() {
    this.temperature = 0;
    this.sky = Sky.Unknown;
  }

  getTemperature(): number {
    return this.temperature;
  }

  getSky(): Sky {
    return this.sky;
  }

  deserialize(input): Weather {
    input = input || new Weather();

    this.temperature = input.temperature;
    this.sky = input.sky;

    return this;
  }
}
