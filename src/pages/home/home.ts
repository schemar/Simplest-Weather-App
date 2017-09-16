import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { WeatherService } from "../../app/weather.service";
import { WeatherLocationInterface } from "../../app/weather-interface";
import { WeatherLocation } from "../../app/weather";
import { LocationSearch } from "../location-search/location-search";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    WeatherService
  ]
})
export class HomePage {
  location: WeatherLocationInterface = new WeatherLocation();

  constructor(private navController: NavController, private weatherService: WeatherService) {
    weatherService.getLocation().then((location) => {this.location = new WeatherLocation().deserialize(location)});
  }

  searchLocation() {
    console.log('Pushing: ', LocationSearch);
    this.navController.push(LocationSearch);
  }

  storeLocation() {
    this.weatherService.storeLocation(this.location);
  }

  getWeather() {
    this.weatherService.updateWeather(this.location);
  }
}
