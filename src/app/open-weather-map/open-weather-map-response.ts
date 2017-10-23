import {Sky} from "../weather/weather-interface";
import {WeatherLocation} from "../weather/weather";

export class OpenWeatherMapResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Details;
  visibility: number;
  wind: Object;
  clouds: Object;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;

  public static toWeatherLocation(response: OpenWeatherMapResponse): WeatherLocation {
    return new WeatherLocation(
      response.id,
      response.name,
      OpenWeatherMapResponse.getCountry(response)
    );
  }

  public static getCountry(response: OpenWeatherMapResponse): string {
    return response.sys.country;
  }

  /**
   * @returns {number} The temperature in Kelvin.
   */
  public static getTemperature(response: OpenWeatherMapResponse): number {
    return response.main.temp;
  }

  public static getSky(response: OpenWeatherMapResponse): Sky {
    let weather = response.weather[0];
    let id = weather.id;

    if (id < 300) {
      return Sky.Thunderstorm;
    }

    if (id < 400) {
      return Sky.Rain;
    }

    if (id < 511) {
      return Sky.RainAndSun;
    }

    if (id < 600) {
      return Sky.Rain;
    }

    if (id < 700) {
      return Sky.Snow;
    }

    if (id < 800) {
      return Sky.Fog;
    }

    if (id === 800) {
      return Sky.Clear;
    }

    if (id === 801) {
      return Sky.CloudsAndSun;
    }

    if (id === 802) {
      return Sky.ScatteredClouds;
    }

    if (id < 900) {
      return Sky.Clouds;
    }

    return Sky.Unknown;
  }
}

class Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  main: string;
  id: number;
  icon: string;
  description: string;
}

class Details {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

class Sys {
  country: string;
}
