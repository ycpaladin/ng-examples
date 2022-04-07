import { Observable } from 'rxjs';

import { SafeType } from './data_item';
import { PermList } from './permission';


export interface IUserService<T = SafeType> {
  login(username: string, password: string, extra: SafeType): Observable<T>;
  logout(): Observable<boolean>;

  getRoles(): Observable<PermList>;
}
