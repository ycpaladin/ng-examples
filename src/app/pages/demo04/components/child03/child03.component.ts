import { Component, OnInit } from '@angular/core';
import { IOnClick, User } from '../../models';

@Component({
  selector: 'app-child03',
  templateUrl: './child03.component.html',
  styleUrls: ['./child03.component.scss']
})
export class Child03Component implements OnInit, IOnClick<User> {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(data: User): void {
    console.log('Child03Component===>', data);

  }

}
