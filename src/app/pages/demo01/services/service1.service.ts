import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Demo01Module } from '../demo01.module';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor(private http: HttpClient) { }

  getData() {
    return of(111);
  }
}
