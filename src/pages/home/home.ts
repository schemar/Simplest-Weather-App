import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { WeatherService } from "../../app/weather.service";
import { LocationSearch } from "../location-search/location-search";
import { StorageService } from "../../app/storage.service";
import { WeatherLocation } from "../../app/weather";
import { WeatherLocationInterface } from "../../app/weather-interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    WeatherService
  ]
})
export class HomePage {
  location: WeatherLocationInterface = new WeatherLocation('id', 'unknown', 'unknown');

  constructor(private navController: NavController, private weatherService: WeatherService, private storage: StorageService) {
    storage.getLocation().then((location) => {
      if(location === null) {
        return;
      }

      console.log('Got location: ', location);
      this.location = new WeatherLocation(location.id, location.name, location.country);
      this.location.now = location.now;
      this.location.soon = location.soon;
      this.location.later = location.later;
      this.location.tomorrow = location.tomorrow;
    });

  }

  searchLocation() {
    let _that = this;
    let setLocationCallback = function(selectedLocation) {
      return new Promise((resolve) => {
        _that.storage.storeLocation(selectedLocation);
        _that.location = selectedLocation;
        _that.getWeather();
        resolve();
      });
    };

    this.navController.push(LocationSearch, {callback: setLocationCallback});
  }

  getWeather() {
    this.weatherService.updateWeather(this.location);
  }
}
