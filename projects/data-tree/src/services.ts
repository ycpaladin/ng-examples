import { Inject, Injectable, Optional, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, isObservable, Subscription } from 'rxjs';
import { map, mergeMap, shareReplay, debounceTime } from 'rxjs/operators';

import { SEARCH_CATEGORY, TREE_CONFIG } from './token';
import { IDataItem, ResponseData } from 'data-table';
import { SelectOption, SelectOptionValue, TreeModuleConfig, TreeNodeData, TreeSearchData } from './interfaces';

export abstract class TreeSearchKeywordsObservable extends Observable<TreeSearchData>  {
  abstract onSearchKeywordsChange(keywords: string): void;
  abstract onSelectChange(category: SelectOptionValue): void;
}

@Injectable()
export class TreeSearchKeywords extends BehaviorSubject<TreeSearchData> implements TreeSearchKeywordsObservable, OnDestroy {
  constructor() {
    super({} as TreeSearchData);
  }

  onSearchKeywordsChange(keywords: string): void {
    const { category } = this.value
    this.next({ keywords, category });
  }

  onSelectChange(category: SelectOptionValue): void {
    this.next({ keywords: '', category });
  }

  ngOnDestroy(): void {
    this.complete();
  }

}


@Injectable()
export class TreeData extends Observable<TreeNodeData[]> {

  constructor(service: TreeDataProvider) {
    super();
    this.source = service.getTreeData().pipe(
      shareReplay()
    )
  }
}


@Injectable()
export abstract class TreeDataProvider {

  abstract getTreeData(params?: { [K: string]: any }): Observable<TreeNodeData[]>;
}


@Injectable()
export class TreeDataProviderInner implements TreeDataProvider {

  constructor(
    @Inject(TREE_CONFIG) public config: TreeModuleConfig,
    public http: HttpClient
  ) {
  }

  getTreeData(params: { [K: string]: any }): Observable<TreeNodeData[]> {
    return this.http.get<ResponseData<TreeNodeData[]>>(
      this.config.treeDataProvideApi,
      {
        params
      }
    ).pipe(
      map(data => data.data)
    )
  }
}


@Injectable()
export class ListData extends Observable<IDataItem[]> {
  constructor(
    kw: TreeSearchKeywordsObservable,
    dataProvider: ListDataProvider
  ) {
    super();
    this.source = kw.pipe(
      debounceTime(500),
      mergeMap(({ category, keywords }) => dataProvider.getListData(keywords, category))
    );
  }
}

@Injectable()
export abstract class ListDataProvider {
  abstract getListData(keywords: string, category?: SelectOptionValue): Observable<IDataItem[]>;
}

@Injectable()
export class ListDataProviderInner implements ListDataProvider {
  constructor(
    @Inject(TREE_CONFIG) public config: TreeModuleConfig,
    public http: HttpClient
  ) {
  }

  getListData(keywords: string, category?: SelectOptionValue): Observable<IDataItem[]> {
    const { api = this.config.listDataProviderApi, searchKey } = category || {};
    return this.http.get<ResponseData<IDataItem[]>>(api, {
      params: {
        [searchKey]: keywords
      }
    }).pipe(
      map(data => data.data)
    )
  }
}



@Injectable()
export abstract class SearchCategoryData extends Observable<SelectOption[]> {

}

@Injectable()
export class SearchCategory extends Observable<SelectOption[]>  {
  constructor(
    @Inject(SEARCH_CATEGORY) @Optional() options: SelectOption[] | Observable<SelectOption[]>
  ) {
    if (isObservable(options)) {
      super();
      this.source = options;
    } else {
      super(subscribe => {
        subscribe.next(options);
        return () => {
        }
      })
    }
  }
}
