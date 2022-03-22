import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { ITree, ITreeSearch, TreeSearchData } from './interfaces';
import { ListData, SelectdTreeNode, TreeData, TreeSearchKeywords, TreeSearchKeywordsObservable } from './services';
import { SEARCH_TOKEN, TREE_TOKEN } from './token';
import { map, tap } from 'rxjs/operators';

type ViewType = 'tree' | 'list';

@Component({
  selector: 'lib-data-tree-layout',
  templateUrl: './data-tree-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TreeData,
    ListData,
    TreeSearchKeywords,
    SelectdTreeNode,
    { provide: TreeSearchKeywordsObservable, useExisting: TreeSearchKeywords }
  ]
})
export class DataTreeLayoutComponent implements OnInit, AfterViewInit {

  // @ViewChild(SEARCH_TOKEN, { static: true }) searchTreeComponent!: ITreeSearch;
  // @ViewChild(TREE_TOKEN, { static: true }) treeComponent!: ITree;

  viewType$!: Observable<ViewType>;

  breadcrumb$: Observable<string[]>;
  constructor(
    keywords: TreeSearchKeywordsObservable,
    public selectedTreeNode$: SelectdTreeNode
  ) {
    this.viewType$ = keywords.pipe(
      map((kw: TreeSearchData) => !!kw.keywords ? 'list' : 'tree')
    );

    // this.breadcrumb$ = selectedTreeNode.pipe(
    //   map(array => array.map(item => item.title))
    // )
  }



  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this.searchTreeComponent, this.treeComponent)
  }

}
