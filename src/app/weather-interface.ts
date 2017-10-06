export interface WeatherLocationInterface {
  id: string;
  name: string;
  now: WeatherInterface;
  soon: WeatherInterface;
  later: WeatherInterface;
  tomorrow: WeatherInterface;
}

export interface WeatherInterface {
  temperature: number;
  sky: Sky;
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
