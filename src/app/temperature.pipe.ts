import { Pipe, PipeTransform } from "@angular/core";

/**
 * Transform the temperature into a common unit
 *
 * Temperatures come in Kelvin by default and should be transformed.
 * The result will be a whole number including the unit.
 * Usage:
 *   value | temperature
 * Example:
 *   {{ 284 | temperature }}
 *   formats to: 11 °C
 */
@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number): string {
    let degreesCelsius = value - 273.15;
    degreesCelsius = Math.round(degreesCelsius);

    return degreesCelsius + ' °C';
  }
}
