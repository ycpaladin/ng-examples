import { ChangeDetectionStrategy, Component, OnInit, forwardRef, EventEmitter, Output, ViewChild, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ITree, TreeModuleConfig } from './interfaces';
import { SelectdTreeNode, TreeData } from './services';
import { TREE_CONFIG, TREE_TOKEN } from './token';

@Component({
  selector: 'lib-data-tree',
  templateUrl: './data-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: TREE_TOKEN, useExisting: forwardRef(() => DataTreeComponent) },
  ]
})
export class DataTreeComponent implements OnInit, OnDestroy, ITree {

  @ViewChild('tree', { static: true }) treeComponent: NzTreeComponent;

  @Output() onTreeNodeSelect = new EventEmitter<NzTreeNode>();

  // 默认展开的节点
  nzExpandedKeys: string[] = [];
  nzSelectedKeys: string[] = [];
  destory$ = new Subject<void>();

  // 1. 点击节点自动展开下一级节点
  onNodeClick(e: NzFormatEmitEvent): void {
    const { expandKeyRoute } = this.config;
    const { level, origin } = e.node;
    const entity = Object.entries(expandKeyRoute).find(([k, v]) => v.includes(level));
    if (entity) {
      this.refreshUrl(origin.id, entity[0]);
    }
    //  else {
    //   const selectedTreeNodeData = [Object.assign(e.node.origin, { level: e.node.level })] as (TreeNodeData | NzTreeNodeOptions)[];
    //   let parent = e.node.parentNode;
    //   while (parent) {
    //     selectedTreeNodeData.unshift(Object.assign(parent.origin, { level: parent.level }));
    //     parent = parent.parentNode;
    //   }
    //   // console.log(selectedTreeNodeData)
    //   this.selectedTreeNode.next(selectedTreeNodeData);
    // }
  }

  private refreshUrl(id: number, urlKey: string): void {
    const urlTree = this.router.createUrlTree([urlKey, id], { relativeTo: this.activatedRoute });
    this.router.navigateByUrl(urlTree);
  }

  constructor(
    @Inject(TREE_CONFIG) public config: TreeModuleConfig,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public data: TreeData,
    public selectedTreeNode: SelectdTreeNode
  ) {
    selectedTreeNode.pipe(
      map(array => array.map(item => item.key)),
      takeUntil(this.destory$)
    ).subscribe(nzExpandedKeys => {
      this.nzExpandedKeys = nzExpandedKeys;
      if (nzExpandedKeys.length) {
        this.nzSelectedKeys = [nzExpandedKeys[nzExpandedKeys.length - 1]];
      }
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
