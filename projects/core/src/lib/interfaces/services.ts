import { Observable } from 'rxjs';

import { UserModel } from './user-model';
import { SafeType } from './data-item';


export interface IUserService {
  login(username: string, password: string, extra: SafeType): Observable<UserModel | void>;
  logout(): Observable<boolean>;
  getUser(): Observable<UserModel>;
}
