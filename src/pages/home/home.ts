import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { WeatherService } from "../../app/weather.service";
import { LocationSearch } from "../location-search/location-search";
import { StorageService } from "../../app/storage.service";
import { WeatherLocation } from "../../app/weather";
import { WeatherLocationInterface } from "../../app/weather-interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  location: WeatherLocationInterface = new WeatherLocation(0, 'unknown', 'unknown');

  constructor(private navController: NavController, private weatherService: WeatherService, private storage: StorageService) {
    storage.getLocation().then((location) => {
      if(location === null) {
        return this.searchLocation();
      }

      this.location = new WeatherLocation(location.id, location.name, location.country);
      this.location.now = location.now;
      this.location.soon = location.soon;
      this.location.later = location.later;
      this.location.tomorrow = location.tomorrow;
    });

  }

  searchLocation() {
    let _that = this;
    let setLocationCallback = selectedLocation => {
        _that.location = selectedLocation;
        _that.getWeather();
    };

    this.navController.push(LocationSearch, {callback: setLocationCallback});
  }

  getWeather() {
    this.weatherService.updateWeather(this.location).then(location => {
      this.storage.storeLocation(location);
      this.location = location
    });
  }
}
