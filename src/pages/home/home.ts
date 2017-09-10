import { Component } from '@angular/core';

import { WeatherService } from "../../app/weather.service";
import { WeatherLocationInterface } from "../../app/weather-interface";
import { WeatherLocation } from "../../app/weather";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    WeatherService
  ]
})
export class HomePage {
  location: WeatherLocationInterface = new WeatherLocation();

  constructor(private weatherService: WeatherService) {
    weatherService.getLocation().then((location) => {this.location = new WeatherLocation().deserialize(location)});
  }

  storeLocation() {
    this.weatherService.storeLocation(this.location);
  }

  getWeather() {
    this.weatherService.updateWeather(this.location);
  }
}
