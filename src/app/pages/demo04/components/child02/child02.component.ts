import { Component, OnInit } from '@angular/core';
import { IOnClick, User } from '../../models';

@Component({
  selector: 'app-child02',
  templateUrl: './child02.component.html',
  styleUrls: ['./child02.component.scss']
})
export class Child02Component implements OnInit, IOnClick<User> {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(data: User): void {
    console.log('Child02Component===>', data);
  }

}
