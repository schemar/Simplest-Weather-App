import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { WeatherService } from "../../app/weather.service";
import { WeatherLocationInterface } from "../../app/weather-interface";
import { WeatherLocation } from "../../app/weather";
import { Location } from "../../app/location";
import { LocationSearch } from "../location-search/location-search";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    WeatherService
  ]
})
export class HomePage {
  location: Location = new Location('id', 'unknown', '');
  weather: WeatherLocationInterface = new WeatherLocation();

  constructor(private navController: NavController, private weatherService: WeatherService) {
    weatherService.getLocation().then((location) => {this.location = location});
    weatherService.getWeather().then((weather) => {this.weather = new WeatherLocation().deserialize(weather)});
  }

  searchLocation() {
    let _that = this;
    let setLocationCallback = function(selectedLocation) {
      return new Promise((resolve) => {
        _that.weatherService.storeLocation(selectedLocation);
        _that.location = selectedLocation;
        _that.weather.id = selectedLocation.id;
        _that.weather.name = selectedLocation.name;
        _that.getWeather();
        resolve();
      });
    };

    this.navController.push(LocationSearch, {callback: setLocationCallback});
  }

  storeWeather() {
    this.weatherService.storeWeather(this.weather);
  }

  getWeather() {
    this.weatherService.updateWeather(this.weather);
  }
}
