import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { ITree, ITreeSearch, TreeSearchData } from './interfaces';
import { ListData, TreeData, TreeSearchKeywords, TreeSearchKeywordsObservable } from './services';
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
    { provide: TreeSearchKeywordsObservable, useExisting: TreeSearchKeywords }
  ]
})
export class DataTreeLayoutComponent implements OnInit, AfterViewInit {

  // @ViewChild(SEARCH_TOKEN, { static: true }) searchTreeComponent!: ITreeSearch;
  // @ViewChild(TREE_TOKEN, { static: true }) treeComponent!: ITree;

  viewType$!: Observable<ViewType>;

  constructor(keywords: TreeSearchKeywordsObservable) {
    this.viewType$ = keywords.pipe(
      map((kw: TreeSearchData) => !!kw.keywords ? 'list' : 'tree')
    );
  }



  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // console.log(this.searchTreeComponent, this.treeComponent)
  }

}
