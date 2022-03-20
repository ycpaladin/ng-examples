import { ResponseData } from './../../data-table/src/interfaces';
import { HttpClient } from '@angular/common/http';
import { TREE_CONFIG } from './token';
import { map, mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { TreeModuleConfig, TreeNodeData } from './interfaces';

export abstract class TreeSearchKeywordsObservable extends Observable<string>  {
}

@Injectable()
export class TreeSearchKeywords extends BehaviorSubject<string> implements TreeSearchKeywordsObservable {
  constructor() {
    super('');
  }
}


@Injectable()
export class TreeData extends Observable<TreeNodeData[]> {

  constructor(
    keywords: TreeSearchKeywordsObservable,
    service: TreeDataProvider,
  ) {
    super();
    this.source = combineLatest([keywords]).pipe(
      mergeMap(params => service.getTreeData(params))
    )
  }
}


@Injectable()
export abstract class TreeDataProvider {

  abstract getTreeData(params: { [K: string]: any }): Observable<TreeNodeData[]>;
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
      this.config.dataProvideApi,
      {
        params
      }
    ).pipe(
      map(data => data.data)
    )
  }
}
