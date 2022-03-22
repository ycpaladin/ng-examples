import { ChangeDetectionStrategy, Component, OnInit, forwardRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
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

  @ViewChild('tree', { static: true}) treeComponent: NzTreeComponent;

  @Output() onTreeNodeSelect = new EventEmitter<NzTreeNode>();

  // 1. 点击节点自动展开下一级节点
  onNodeClick(e: NzFormatEmitEvent): void {
    console.log(e, e.node.isExpanded);
    e.node.setExpanded(true); // ?????
    // this.treeComponent.nzTreeService.setExpandedNodeList(e.node);
  }

  constructor(public data: TreeData) { }

  ngOnInit(): void {
  }

}
