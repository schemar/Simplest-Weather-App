import {Pipe, PipeTransform} from "@angular/core";
import {Sky} from "./weather-interface";

/**
 * Transform the Sky number into an icon name
 *
 * The Sky enum is used to store the sky of a location. This pipe transforms the enum value into an ionic icon name.
 * Usage:
 *   value | skyIcon
 * Example:
 *   {{ Sky.Clear | skyIcon }}
 *   formats to: sunny
 */
@Pipe({
  name: 'skyIcon',
})
export class SkyIconPipe implements PipeTransform {
  transform(value: number): string {
    switch(value) {
      case Sky.Clear:
        return 'sunny';
      case Sky.Rain:
      case Sky.RainAndSun:
        return 'rainy';
      case Sky.Snow:
        return 'snow';
      case Sky.Fog:
      case Sky.Clouds:
        return 'cloudy';
      case Sky.ScatteredClouds:
      case Sky.CloudsAndSun:
        return 'partly-sunny';
      case Sky.Thunderstorm:
        return 'thunderstorm';
      case Sky.Unknown:
      default:
        return 'help'; // question mark
    }
  }
}
