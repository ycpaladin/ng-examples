import { Component, OnInit, ChangeDetectionStrategy, Injector, Inject } from '@angular/core';
import { TREE_SERVICE_TOKEN } from './consts/token';
import { ITreeService } from './models/tree-service-base';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent implements OnInit {

  constructor(
    @Inject(TREE_SERVICE_TOKEN) public service: ITreeService
  ) {
    console.log('==>', this.service);
  }

  ngOnInit(): void {
  }

}
