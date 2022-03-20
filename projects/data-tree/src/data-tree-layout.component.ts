import { Component, OnInit, ChangeDetectionStrategy, ContentChild, AfterContentInit, ViewChild, AfterViewInit } from '@angular/core';
import { ITree, ITreeSearch } from './interfaces';
import { SEARCH_TOKEN, TREE_TOKEN } from './token';

@Component({
  selector: 'lib-data-tree-layout',
  templateUrl: './data-tree-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreeLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild(SEARCH_TOKEN, { static: true }) searchTreeComponent: ITreeSearch;
  @ViewChild(TREE_TOKEN, { static: true }) treeComponent: ITree;

  constructor() { }



  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.searchTreeComponent, this.treeComponent)
  }

}
