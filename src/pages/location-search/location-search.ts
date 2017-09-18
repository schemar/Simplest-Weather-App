import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { OpenWeatherMapService } from "../../app/open-weather-map.service";
import { Location } from "../../app/location";

@Component({
  selector: 'page-location-search',
  templateUrl: 'location-search.html'
})
export class LocationSearch {
  searchInput: string;
  callback: LocationCallbackFunction;
  items: Location[] = [];

  constructor(private navController: NavController, private navParams: NavParams, private openWeatherMap: OpenWeatherMapService) {
    this.callback = navParams.get('callback');
  }

  getItems() {
    this.openWeatherMap.findLocations(this.searchInput, this.items);
  }

  selectItem(item) {
    this.callback(item).then(() => {
      this.navController.pop();
    });
  }
}

interface LocationCallbackFunction {
  (location: Location): Promise<void>
};
