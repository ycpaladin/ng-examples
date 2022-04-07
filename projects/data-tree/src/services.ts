import { Inject, Injectable, Optional, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Subject, Observable, BehaviorSubject, isObservable, zip } from 'rxjs';
import { map, mergeMap, shareReplay, debounceTime, filter, takeUntil, withLatestFrom, delay } from 'rxjs/operators';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { SEARCH_CATEGORY, TREE_CONFIG } from './token';
import { SelectOption, SelectOptionValue, TreeModuleConfig, TreeNodeData, TreeSearchData } from './interfaces';
import { f, getParams } from './utils';
import { IDataItem, ResponseData } from 'core';

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
      this.config.treeDataProvider as string,
      { params }
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
    const { api = this.config.listDataProvider, searchKey } = category || {};
    return this.http.get<ResponseData<IDataItem[]>>(api as string, {
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
    router: Router,
    activatedRoute: ActivatedRoute,
    data: TreeData,
  ) {
    super([]);
    const routerSource$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );

    const params$ = routerSource$.pipe(
      mergeMap(() => combineLatest(getParams(activatedRoute))),
      map((params) => {
        return params.find(p => Object.keys(p).length > 0);
      })
    );

    const level$ = routerSource$.pipe(
      map(() => {
        const entity = Object.entries(config.expandKeyRoute).find(([key]) => router.url.indexOf(key) !== -1);
        if (entity) {
          // const [, level] = entity; // 有level 说明匹配成功
          return entity[1];
        }
        return null;
      }),
      filter(v => !!v)
    );

    // 路由发生变化后，重新监听路由参数变化
    const paramsSource$ = routerSource$.pipe(
      withLatestFrom(params$),
      map(([, params]) => params)
    )

    // 只要路由参数发生变化，从数据中查找
    zip(paramsSource$, level$).pipe(
      delay(0),
      withLatestFrom(data),
    ).pipe(
      map(([[{ id }, level], d]) => {
        return f(level, parseInt(id, 10))(d, []);
      }),
      takeUntil(this.destory$)
    ).subscribe(result => {
      this.next(result);
    })
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
    this.complete();
  }
}
