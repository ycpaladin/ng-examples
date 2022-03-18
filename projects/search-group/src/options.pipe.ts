import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, from } from 'rxjs';
import { SelectOptionType, SelectOption } from './interfaces';
import { isPromise } from './utils';



@Pipe({
  name: 'options'
})
export class OptionsPipe implements PipeTransform {

  transform(value: SelectOptionType): Observable<SelectOption[]> {
    if (isObservable(value)) {
      return value;
    } else if (isPromise<SelectOption[]>(value)) {
      return from(value);
    } else {
      return of(value)
    }
  }

}
