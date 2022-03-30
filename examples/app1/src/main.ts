import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineApplication, IApplication, NgApplication } from 'micro-front';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
defineApplication('app1', {
  template: '<app1-root></app1-root>',
  bootstrap: (portalApp: IApplication) => {
    return platformBrowserDynamic([
      {
        provide: NgApplication,
        useValue: portalApp
      },
      // {
      //   provide: AppRootContext,
      //   useValue: portalApp.data.appRootContext
      // }
    ]).bootstrapModule(AppModule)
      .catch(err => {
        console.error('=>>>>>>', err)
        return null;
      })
  }
})


