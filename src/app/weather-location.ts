export class WeatherLocation {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Details;
  visibility: number;
  wind: Object;
  clouds: Object;
  dt: number;
  sys: Object;
  id: number;
  name: string;
  cod: number;

  constructor() {
    this.weather = [];
    this.main = new Details();
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
