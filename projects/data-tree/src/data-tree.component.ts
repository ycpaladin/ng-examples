import { ChangeDetectionStrategy, Component, OnInit, forwardRef } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { ITree } from './interfaces';
import { TreeData, TreeSearchKeywords, TreeSearchKeywordsObservable } from './services';
import { TREE_TOKEN } from './token';


type ViewType = 'tree' | 'list';


@Component({
  selector: 'lib-data-tree',
  templateUrl: './data-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TREE_TOKEN, useExisting: forwardRef(() => DataTreeComponent) },
    TreeData,
    TreeSearchKeywords,
    { provide: TreeSearchKeywordsObservable, useExisting: TreeSearchKeywords }
  ]
})
export class DataTreeComponent implements OnInit, ITree {

  constructor(public data: TreeData) { }

  onTreeNodeSelect(node: NzTreeNode): void {
  }

  ngOnInit(): void {
  }

}
