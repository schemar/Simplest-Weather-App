import { Component } from '@angular/core';

import { Location } from "../../app/location";
import { WeatherLocation } from "../../app/weather-location";
import { WeatherService } from "../../app/weather.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    WeatherService
  ]
})
export class HomePage {
  location: Location = new Location();
  weatherLocation: WeatherLocation = new WeatherLocation();

  constructor(private weatherService: WeatherService) {
    weatherService.getLocation().then((location) => {this.location = location});
  }

  setLocation() {
    this.weatherService.setLocation(this.location);
    console.log(this.weatherLocation);
  }

  getWeather() {
    this.weatherService.getWeather(this.location).subscribe(response => this.weatherLocation = response.json());
  }
}
