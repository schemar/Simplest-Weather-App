export interface WeatherLocationInterface {
  id: string;
  name: string;
  now: WeatherInterface;
  soon: WeatherInterface;
  later: WeatherInterface;
  tomorrow: WeatherInterface;

  deserialize(input: Object): WeatherLocationInterface;
}

export interface WeatherInterface {
  getTemperature(): number;
  getSky(): Sky;

  deserialize(input: Object): WeatherInterface;
}

export enum Sky {
  Thunderstorm,
  Rain,
  RainAndSun,
  Snow,
  Fog,
  Clear,
  Clouds,
  ScatteredClouds,
  CloudsAndSun,
  Unknown
}
