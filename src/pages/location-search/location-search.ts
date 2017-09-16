import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-location-search',
  templateUrl: 'location-search.html'
})
export class LocationSearch {
  items: string[] = ['1', 'two'];

  constructor(private navController: NavController) {
  }

  getItems() {
    this.items.push('moar');
  }

  selectItem(item) {
    console.log(item);
    this.navController.pop();
  }
}
