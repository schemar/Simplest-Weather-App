import {Injectable} from "@angular/core";
import {Storage} from '@ionic/storage';

@Injectable()
export class OpenWeatherMapStorageService {
  private static KEY_NOW: string = 'nowUpdate';
  private static KEY_FORECAST: string = 'forecastUpdate';

  constructor(private storage: Storage) {}

  public storeUpdateNow(): void {
    this.storeUpdate(OpenWeatherMapStorageService.KEY_NOW);
  }

  public storeUpdateForecast(): void {
    this.storeUpdate(OpenWeatherMapStorageService.KEY_FORECAST);
  }

  public getUpdateNow(): Promise<Date> {
    return this.getUpdate(OpenWeatherMapStorageService.KEY_NOW);
  }

  public getUpdateForecast(): Promise<Date> {
    return this.getUpdate(OpenWeatherMapStorageService.KEY_FORECAST);
  }

  /**
   * Deletes all updates from the storage.
   * @returns {Promise<any>}
   */
  public resetUpdates(): Promise<any> {
    return this.storage.remove(OpenWeatherMapStorageService.KEY_NOW).then(() => {
      return this.storage.remove(OpenWeatherMapStorageService.KEY_FORECAST)
    });
  }

  private storeUpdate(key: string): void {
    this.storage.set(key, Date.now());
  }

  private getUpdate(key: string): Promise<Date> {
    return this.storage.get(key).then(value => {
      return new Date(value);
    });
  }
}
