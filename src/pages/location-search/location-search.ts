import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";

import {WeatherLocation} from "../../app/weather/weather";
import {WeatherService} from "../../app/weather/weather.service";

@Component({
  selector: 'page-location-search',
  templateUrl: 'location-search.html',
})
export class LocationSearch {
  private searchInput: string;
  private callback;
  items: WeatherLocation[] = [];

  constructor(
    private navController: NavController,
    private weatherService: WeatherService,
    navParams: NavParams
  ) {
    this.callback = navParams.get('callback');
  }

  /**
   * Shows a list of locations retrieved from the API.
   */
  getItems() {
    this.weatherService.findLocations(this.searchInput).then(items => this.items = items);
  }

  /**
   * Select an item in the list of locations.
   * @param item - The chosen location.
   */
  selectItem(item) {
    this.callback(item);
    this.navController.pop()
  }
}
