import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpService } from './../http.service';

export interface AppConfigDocument {
  _id: string | null;
  type: string;
  refreshTokenDurationInMilliseconds: number;
  extendSessionDialogDisplayPeriodInMilliseconds: number;
  maxAgeInMilliseconds: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private endpointUrl = 'app-config';

  /**
   * Defaults just in case the config is not loaded yet
   * or the request fails.
   * // TODO TODOLuxury, move defaults to common package and import here.
   */
  private config: AppConfigDocument = {
    _id: null,
    type: 'app_config',
    refreshTokenDurationInMilliseconds: 28800000,
    extendSessionDialogDisplayPeriodInMilliseconds: 15000,
    maxAgeInMilliseconds: 604800000,
  };

  constructor(private httpService: HttpService) {}

  get(): Observable<AppConfigDocument> {
    if (this.config._id != null) {
      return of(this.config);
    }
    return this.httpService.get<AppConfigDocument>(`${this.endpointUrl}`).pipe(
      tap((config) => (this.config = config)),
      catchError((error) => {
        console.error('Failed to load app config', error);
        return of(this.config);
      })
    );
  }
}
