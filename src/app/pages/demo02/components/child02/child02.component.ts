import { Component, OnInit, Optional, Output, EventEmitter, AfterContentInit, AfterViewInit } from '@angular/core';
import { Parent } from '../../models';

@Component({
  selector: 'app-child02',
  templateUrl: './child02.component.html',
  styleUrls: ['./child02.component.scss']
})
export class Child02Component implements OnInit, AfterContentInit, AfterViewInit {


  name = 'Child02Component';

  @Output() selected = new EventEmitter<string>();
  constructor(@Optional() public parent: Parent) {
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit', this.parent.name, this.parent.child01.name, this.parent.child02.name);
    this.selected.subscribe(this.parent.child03.searchData);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.parent.name, this.parent.child01.name, this.parent.child02.name);

  }



}
