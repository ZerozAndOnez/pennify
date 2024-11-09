import { bootstrapApplication } from '@angular/platform-browser';
import { registerLicense } from '@syncfusion/ej2-base';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

registerLicense(environment.syncfusionPublicLicenseKey);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
