import {Component} from '@angular/core';
import {LoadingController, NavController, Platform} from "ionic-angular";

import {WeatherService} from "../../app/weather/weather.service";
import {LocationSearch} from "../location-search/location-search";
import {StorageService} from "../../app/weather/storage.service";
import {WeatherLocation} from "../../app/weather/weather";
import {WeatherLocationInterface} from "../../app/weather/weather-interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  location: WeatherLocationInterface = new WeatherLocation(0, 'unknown', 'unknown');

  constructor(
    private navController: NavController,
    private loadingController: LoadingController,
    private weather: WeatherService,
    private storage: StorageService,
    platform: Platform
  ) {
    storage.getLocation().then(location => {
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

  /**
   * Navigate away to the location search page.
   */
  searchLocation() {
    let _that = this;
    let setLocationCallback = selectedLocation => {
        _that.location = selectedLocation;
        _that.weather.resetWeather().then(() => {
          _that.getWeather();
        });
    };

    this.navController.push(LocationSearch, {callback: setLocationCallback});
  }

  /**
   * Updates the weather from the "WeatherService".
   */
  getWeather() {
    let loader = this.loadingController.create({
      content: 'Updating ...'
    });

    loader.present();

    this.weather.updateWeather(this.location).then(location => {
      this.storage.storeLocation(location);
      this.location = location;

      loader.dismiss();
    });
  }
}
