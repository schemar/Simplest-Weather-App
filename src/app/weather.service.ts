import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage';

import { Location } from "./location";

@Injectable()
export class WeatherService {
  apiKey: string = '15737c2e295e46d2f02eac5ff71488c8';
  constructor(private storage: Storage, private http: Http) {}

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

  setLocation(location: Location) {
    this.storage.set('location', location)
      .then(function() {console.log('Stored location', location)})
      .catch(function() {console.log('Could not store location', location)});
  }

  getWeather(location: Location) {
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+location.name+'&APPID='+this.apiKey);
  }
}
