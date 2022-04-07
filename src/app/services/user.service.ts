import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserService, SafeType, UserModel, ResponseData } from 'projects/core/src/public-api';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
// import { IUserService  } from 'core';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  constructor(public http: HttpClient) { }

  login(username: string, password: string, extra: SafeType = {}): Observable<UserModel> {
    return this.http.post<ResponseData<UserModel>>('/lms/api/v1/login', { username, password, ...extra }).pipe(
      mergeMap(() => this.getUser())
    );
  }
  logout(): Observable<boolean> {
    // /lms/api/v1/logout
    throw new Error('Method not implemented.');
  }
  getUser(): Observable<UserModel> {
    return this.http.get<ResponseData<UserModel>>('/lms/api/v1/user/info-self').pipe(
      map(data => data.data),
    );
  }
}
