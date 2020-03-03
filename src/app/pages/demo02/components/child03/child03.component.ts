import { Component, OnInit, Optional } from '@angular/core';
import { Parent } from '../../models';


export abstract class IChild03 {
  abstract searchData(params: any): void;
}

@Component({
  selector: 'app-child03',
  templateUrl: './child03.component.html',
  styleUrls: ['./child03.component.scss']
})
export class Child03Component implements OnInit, IChild03 {

  name = 'Child03Component';

  constructor(@Optional() public parent: Parent) { }

  ngOnInit(): void {
  }

  searchData(params: any): void {
    console.log('searchData', params);
  }
}
