import { Component, OnInit, forwardRef, Host, ContentChild, AfterContentInit, ViewChild } from '@angular/core';
import { Parent, ServiceBase } from '../../models';
import { Service01Service } from '../../services/Service01Service';
import { Child01Component } from '../child01/child01.component';
import { Child02Component } from '../child02/child02.component';
import { IChild03 } from '../child03/child03.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  providers: [
    {
      provide: Parent,
      useExisting: forwardRef(() => ParentComponent)
    },
    {
      provide: ServiceBase,
      useClass: Service01Service
    }
  ]
})
export class ParentComponent implements OnInit, Parent, AfterContentInit {

  name = '!parent..';

  @ContentChild('app01') public child01: Child01Component;
  @ContentChild(Child02Component) public child02: Child02Component;
  @ContentChild('app03') public child03: IChild03;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.child01, this.child02, this.child03);
  }


  ngAfterContentInit(): void {
    console.log(this.child01, this.child02, this.child03);
    // this.child03.searchData(11111);
    // this.child02.selected.subscribe(this.child03.searchData);
  }
}
