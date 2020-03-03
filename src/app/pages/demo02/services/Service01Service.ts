import { Injectable } from '@angular/core';
import { ServiceBase } from '../models';
@Injectable({
  providedIn: 'root'
})
export class Service01Service extends ServiceBase {
  constructor() {
    super();
  }

  getList() {
    return ['111', '222'];
  }
}
