import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Location } from '../../app/location';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  location: Location = new Location();

  constructor(private storage: Storage) {
    storage.get('location').then((locationName) => {
      this.location.name = locationName;
    });
  }

  setLocation() {
    this.storage.set('location', this.location.name)
      .then(function() {console.log('Stored location name')})
      .catch(function() {console.log('Could not store location name')});
  }
}
