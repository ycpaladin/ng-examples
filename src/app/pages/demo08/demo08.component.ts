import { Component, OnInit, Inject } from '@angular/core';
import { TreeService } from './tree.service';
import { TREE_SERVICE_TOKEN } from 'src/app/shared/tree/consts/token';
import { ITreeService } from 'src/app/shared/tree/models/tree-service-base';


@Component({
  selector: 'app-demo08',
  templateUrl: './demo08.component.html',
  styleUrls: ['./demo08.component.scss'],
  providers: [
    { provide: TREE_SERVICE_TOKEN, useClass: TreeService }
  ]
})
export class Demo08Component implements OnInit {

  click() {
    this.service.extendKeys.push('1112');
  }

  constructor(
    // public service: TreeService
    @Inject(TREE_SERVICE_TOKEN) public service: ITreeService
  ) { }

  ngOnInit(): void {
  }

}
