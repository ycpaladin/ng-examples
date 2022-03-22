import { ChangeDetectionStrategy, Component, OnInit, forwardRef, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { map } from 'rxjs/operators';
import { ITree, TreeNodeData } from './interfaces';
import { SelectdTreeNode, TreeData } from './services';
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

  @ViewChild('tree', { static: true }) treeComponent: NzTreeComponent;

  @Output() onTreeNodeSelect = new EventEmitter<NzTreeNode>();

  nzExpandedKeys: string[] = [];

  // 1. 点击节点自动展开下一级节点
  onNodeClick(e: NzFormatEmitEvent): void {
    console.log(e, e.node.isExpanded);
    // e.node.setExpanded(true); // ?????

    const selectedTreeNodeData = [Object.assign(e.node.origin, { level: e.node.level })] as (TreeNodeData | NzTreeNodeOptions)[];
    let parent = e.node.parentNode;
    while (parent) {
      selectedTreeNodeData.unshift(Object.assign(parent.origin, { level: parent.level }));
      parent = parent.parentNode;
    }
    // this.nzExpandedKeys = nzExpandedKeys;
    this.selectedTreeNode.next(selectedTreeNodeData)
  }

  constructor(private cdr: ChangeDetectorRef, public data: TreeData, public selectedTreeNode: SelectdTreeNode) {
    selectedTreeNode.pipe(
      map(array => array.map(item => item.key))
    ).subscribe(nzExpandedKeys => {
      this.nzExpandedKeys = nzExpandedKeys;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
  }

}
