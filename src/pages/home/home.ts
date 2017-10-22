import { Component } from '@angular/core';
import {LoadingController, NavController, Platform} from "ionic-angular";

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

  constructor(
    private navController: NavController,
    private loadingController: LoadingController,
    private weatherService: WeatherService,
    private storage: StorageService,
    platform: Platform
  ) {
    storage.getLocation().then((location) => {
      if(location === null) {
        return this.searchLocation();
      }

      this.location = location;
      this.getWeather();
    });

    platform.resume.subscribe(() => {
      this.getWeather();
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
    let loader = this.loadingController.create({
      content: 'Updating ...'
    });

    loader.present();

    this.weatherService.updateWeather(this.location).then(location => {
      this.storage.storeLocation(location);
      this.location = location;

      loader.dismiss();
    });
  }
}
