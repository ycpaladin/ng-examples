import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineApplication, IApplication, NgApplication } from 'micro-front';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

defineApplication('app2', {
  template: '<app2-root></app2-root>',
  bootstrap: async (portalApp: IApplication) => {
    return await platformBrowserDynamic([
      {
        provide: NgApplication,
        useValue: portalApp
      },
    ]).bootstrapModule(AppModule)
      .catch(err => {
        console.error(err);
        return null
      });
  }
})

