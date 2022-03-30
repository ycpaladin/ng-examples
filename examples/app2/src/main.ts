import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineApplication, IApplication } from 'micro-front';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

defineApplication('app2', {
  template: '<app2-root></app2-root>',
  bootstrap: (app: IApplication) => {
    return platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => {
        console.error(err);
        return null
      });
  }
})

