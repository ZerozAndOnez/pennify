import { bootstrapApplication } from '@angular/platform-browser';
import { registerLicense } from '@syncfusion/ej2-base';
import {
  getAllDataFromLocalForage,
  default as localForage,
} from 'ngrx-store-persist';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';
import { STORE_KEYS } from './store/index';

async function main() {
  // Load persisted state before bootstrap
  await getAllDataFromLocalForage({
    driver: localForage.INDEXEDDB,
    keys: STORE_KEYS,
  });

  registerLicense(environment.syncfusionPublicLicenseKey);

  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
}

main();
