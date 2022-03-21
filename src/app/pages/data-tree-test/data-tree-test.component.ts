import { Component, OnInit, ChangeDetectionStrategy, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { ITree, TREE_TOKEN } from 'data-tree';

@Component({
  selector: 'app-data-tree-test',
  templateUrl: './data-tree-test.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreeTestComponent implements OnInit, AfterContentInit {

  // @Inject(TREE_TOKEN) public treeComponent: ITree
  constructor() { }


  @ContentChildren(TREE_TOKEN, { descendants: true }) treeComponent!: QueryList<ITree>;

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // console.log(this.treeComponent);
    // this.treeComponent.changes.subscribe(console.log)
  }

}
