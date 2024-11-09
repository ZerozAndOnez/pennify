import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { appRoutes } from './app.routes';
import { userReducer } from './user/store/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({ user: userReducer }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
