import { Observable } from 'rxjs';

import { UserModel } from './user_model';
import { SafeType } from './data_item';


export interface IUserService {
  login(username: string, password: string, extra: SafeType): Observable<UserModel>;
  logout(): Observable<boolean>;
}
