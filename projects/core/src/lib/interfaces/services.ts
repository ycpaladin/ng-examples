import { Observable } from 'rxjs';

import { SafeType } from './data_item';
import { PermList } from './permission';
import { UserModel } from './user_model';


export interface IUserService<T = UserModel> {
  login(username: string, password: string, extra: SafeType): Observable<T>;
  logout(): Observable<boolean>;

  getPermList(): Observable<PermList>;
}
