export interface WeatherLocationInterface {
  readonly id: number;
  readonly name: string;
  readonly country: string;
  now: WeatherInterface;
  soon: WeatherInterface;
  later: WeatherInterface;
  tomorrow: WeatherInterface;
}

export interface WeatherInterface {
  readonly temperature: number;
  readonly sky: Sky;
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
