import {NgModule} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage";

import {OpenWeatherMapModule} from "../open-weather-map/open-weather-map.module";

import {StorageService} from "./storage.service";
import {WeatherService} from "./weather.service";
import {TemperaturePipe} from "./temperature.pipe";
import {SkyIconPipe} from "./skyIcon.pipe";

@NgModule({
  declarations: [
    TemperaturePipe,
    SkyIconPipe,
  ],
  imports:      [
    IonicStorageModule.forRoot(),
    OpenWeatherMapModule,
  ],
  exports: [
    TemperaturePipe,
    SkyIconPipe,
  ],
  providers:    [
    WeatherService,
    StorageService,
  ],
})
export class WeatherModule {}
