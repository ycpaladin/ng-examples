import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserService, SafeType, ResponseData, PermList } from 'core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { User } from '../interfaces';
// import { IUserService  } from 'core';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService<User> {

  constructor(public http: HttpClient) { }


  login(username: string, password: string, extra: SafeType = {}): Observable<User> {
    return this.http.post<ResponseData<string>>('/lms/api/v1/login', { username, password, ...extra }).pipe(
      mergeMap(() => this.getUser())
    );
  }
  logout(): Observable<boolean> {
    return this.http.get<ResponseData<string>>('/lms/api/v1/logout').pipe(
      map(data => !!data.data),
    );
  }
  getUser(): Observable<User> {
    return this.http.get<ResponseData<User>>('/lms/api/v1/user/info-self').pipe(
      map(data => data.data),
    );
  }

  getPermList(): Observable<PermList> {
    return this.http.get<ResponseData<PermList>>('/lms/api/v1/user/role-self-allowed-user?org_code=luxshare-ict-JS').pipe(
      map(data => data.data),
    );
  }
}
