import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, MetaReducer } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

import { appRoutes } from './app.routes';
import { STORE_REDUCERS } from '../store';

const metaReducers: MetaReducer[] = [storageSyncMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(STORE_REDUCERS, { metaReducers }),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
