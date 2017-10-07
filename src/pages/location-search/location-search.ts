import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { WeatherLocation } from "../../app/weather";
import { WeatherService } from "../../app/weather.service";

@Component({
  selector: 'page-location-search',
  templateUrl: 'location-search.html'
})
export class LocationSearch {
  private searchInput: string;
  private callback;
  private items: WeatherLocation[] = [];

  constructor(private navController: NavController, navParams: NavParams, private weatherService: WeatherService) {
    this.callback = navParams.get('callback');
  }

  getItems() {
    this.weatherService.findLocations(this.searchInput).then(items => this.items = items);
  }

  selectItem(item) {
    this.callback(item);
    this.navController.pop()
  }
}
