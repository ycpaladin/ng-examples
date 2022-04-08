import { Inject, Pipe, PipeTransform } from '@angular/core';
import { IDataItem } from 'core';
import { isObservable, Observable, of } from 'rxjs';
import { IDisabledBy } from './interfaces';
import { DISABLED_BY } from './token';

@Pipe({
  name: 'disabledBy'
})
export class DisabledByPipe implements PipeTransform {

  constructor(@Inject(DISABLED_BY) public tableComponent: IDisabledBy) {
  }

  transform(value: IDataItem): Observable<boolean> {
    const result = this.tableComponent.disabledBy(value);
    if (isObservable(result)) {
      return result
    } else {
      return of(result);
    }
  }

}
