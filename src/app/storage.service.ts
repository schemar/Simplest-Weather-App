import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { WeatherLocationInterface } from "./weather-interface";

@Injectable()
export class StorageService {
  constructor(private storage: Storage) {}

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

  storeLocation(location: WeatherLocationInterface) {
    this.storage.set('location', location)
      .then(function() {console.log('Stored location', location)})
      .catch(function() {console.log('Could not store location', location)});
  }
}
