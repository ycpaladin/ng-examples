import { Injectable } from '@angular/core';
import { ITableService, User, IResponseData } from '../models';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService extends ITableService<User> {


  constructor() {
    super();
  }

  getPagedData(): Observable<IResponseData<User>> {
    return of({
      result: 'ok',
      data: [{
        id: 1,
        state: 'OK',
        name: 'kevin',
        age: 11
      }, {
        id: 2,
        state: 'OK',
        name: 'kevin222',
        age: 13
      }]
    });
  }

}
