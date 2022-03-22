import { Inject, Injectable, Optional, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Subject, Observable, BehaviorSubject, isObservable } from 'rxjs';
import { map, mergeMap, shareReplay, debounceTime, filter, takeUntil, withLatestFrom } from 'rxjs/operators';

import { SEARCH_CATEGORY, TREE_CONFIG } from './token';
import { IDataItem, ResponseData } from 'data-table';
import { SelectOption, SelectOptionValue, TreeModuleConfig, TreeNodeData, TreeSearchData } from './interfaces';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

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
export class SearchCategoryData extends Observable<SelectOption[]>  {
  constructor(
    @Inject(SEARCH_CATEGORY) @Optional() options: SelectOption[] | Observable<SelectOption[]>
  ) {
    if (isObservable(options)) {
      super();
      this.source = options;
    } else {
      super(subscribe => {
        subscribe.next(options || []);
        return () => {
          subscribe.complete();
        }
      })
    }
  }
}


@Injectable()
export class SelectdTreeNode extends BehaviorSubject<(TreeNodeData | NzTreeNodeOptions)[]> implements OnDestroy {

  destory$ = new Subject<void>();

  constructor(
    @Inject(TREE_CONFIG) public config: TreeModuleConfig,
    data: TreeData,
    activatedRoute: ActivatedRoute,
    router: Router,
  ) {
    super([]);
    const { href } = window.location;
    const key = Object.keys(config.expandKeyRoute).find(key => href.indexOf(key) !== -1);
    if (key) {
      const level = config.expandKeyRoute[key]; // 有level 说明匹配成功

      const find = (data: TreeNodeData[], id: number, array: TreeNodeData[], dataLevel: number = 0, cb?: () => void) => {
        return data.reduce((prev, curr) => {
          if (curr.id === id && level.includes(dataLevel)) {
            array.push({ ...curr, level: dataLevel });
            if (cb) {
              cb();
            }
          }
          return find(curr.children, id, prev, dataLevel + 1, () => {
            array.unshift({ ...curr, level: dataLevel });
            if (cb) {
              cb();
            }
          })
        }, array);
      }

      const sources = (function getParams(ar: ActivatedRoute, array: Observable<Params>[] = []): Observable<Params>[] {
        return ar.children.reduce((prev, curr) => {
          prev.push(curr.params);
          return getParams(curr, prev);
        }, array);
      })(activatedRoute)

      const params$ = combineLatest(sources).pipe(
        map(params => {
          // console.log('==>', params)
          return params.find(p => Object.keys(p).length > 0);
        })
      )

      // 路由发生变化后，重新监听路由参数变化
      const paramsSource$ = router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        withLatestFrom(params$),
        map(([, params]) => params)
      )

      // 只要路由参数发生变化，从数据中查找
      combineLatest([data, paramsSource$]).pipe(
        map(([d, { id }]) => find(d, parseInt(id, 10), [])),
        takeUntil(this.destory$)
      ).subscribe(result => {
        this.next(result);
      })
    }
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
    this.complete();
  }
}
