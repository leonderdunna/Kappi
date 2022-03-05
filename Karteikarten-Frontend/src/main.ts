import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import Gleap from 'gleap';

// Please make sure to call this method only once!
Gleap.initialize("vx6iJW97SlJOMO1MKcLUAMElgPAxYtlo");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
