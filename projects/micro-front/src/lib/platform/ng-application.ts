import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IApplication } from '../interfaces';


export class NgApplication implements IApplication {
  constructor(public ngZone: NgZone, public router: Router) {
  }

  navigateByUrl(url: string, extras?: any): Promise<boolean> {
    return this.ngZone!.run(() => {
      return this.router!.navigateByUrl(url, extras);
    });
  }

}
