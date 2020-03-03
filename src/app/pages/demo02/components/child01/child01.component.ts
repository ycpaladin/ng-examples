import { Component, OnInit, Optional } from '@angular/core';
import { Parent, ServiceBase } from '../../models';

@Component({
  selector: 'app-child01',
  templateUrl: './child01.component.html',
  styleUrls: ['./child01.component.scss']
})
export class Child01Component implements OnInit {
  name = 'Child01Component';

  constructor(@Optional() public parent: Parent, @Optional() public service: ServiceBase) {
    // console.log('===>', this.service);
  }

  ngOnInit(): void {
  }

}
