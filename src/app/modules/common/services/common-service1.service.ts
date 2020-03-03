import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
let num = 0;

@Injectable()
export class CommonService1Service {

  data$: Observable<number>;
  constructor() {
    this.data$ = of(num += 1);
  }

  getData(): Observable<number> {
    return this.data$;
  }
}
