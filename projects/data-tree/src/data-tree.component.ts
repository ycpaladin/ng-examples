import { ChangeDetectionStrategy, Component, OnInit, forwardRef } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { ITree } from './interfaces';
import { TreeData } from './services';
import { TREE_TOKEN } from './token';


// type ViewType = 'tree' | 'list';


@Component({
  selector: 'lib-data-tree',
  templateUrl: './data-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TREE_TOKEN, useExisting: forwardRef(() => DataTreeComponent) },
  ]
})
export class DataTreeComponent implements OnInit, ITree {

  constructor(public data: TreeData) { }

  onTreeNodeSelect(node: NzTreeNode): void {
  }

  ngOnInit(): void {
  }

}
