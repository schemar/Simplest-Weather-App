import {NgModule} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage";

import {OpenWeatherMapService} from "./open-weather-map.service";
import {OpenWeatherMapStorageService} from "./open-weather-map-storage.service";

@NgModule({
  imports:      [
    IonicStorageModule.forRoot(),
  ],
  declarations: [],
  exports:      [],
  providers:    [
    OpenWeatherMapService,
    OpenWeatherMapStorageService,
  ],
})
export class OpenWeatherMapModule {}
