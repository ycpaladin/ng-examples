import { Inject, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { catchError, debounceTime, map, mergeMap, tap, shareReplay } from 'rxjs/operators';
import { PAGED_DATA_SERVICE } from "./token";
import { IDataItem, ITableDataProvider, IPageIndexChange, IPageSizeChange, IQueryParamsChange, OrderByType, Params, ResponsePagedData } from "./interfaces";


export abstract class PageIndexChange extends Observable<number> implements IPageIndexChange {
  abstract pageIndexChange(pageIndex: number): void;
  abstract restore(): void;
}

@Injectable()
export class PageIndex extends BehaviorSubject<number> implements PageIndexChange, OnDestroy {
  // TODO 可以从全局配置中获取默认值
  constructor() {
    super(1)
  }
  pageIndexChange(pageIndex: number): void {
    this.next(pageIndex);
  }
  restore(): void {
    this.next(1);
  }

  ngOnDestroy(): void {
    this.complete();
  }

}


export abstract class PageSizeChange extends Observable<number> implements IPageSizeChange {
  abstract pageSizeChange(pageIndex: number): void;
  abstract restore(): void;
}

@Injectable()
export class PageSize extends BehaviorSubject<number> implements PageSizeChange, OnDestroy {
  // TODO 可以从全局配置中获取默认值
  constructor(private pageIndex: PageIndexChange) {
    super(10)
  }

  pageSizeChange(pageSize: number): void {
    this.next(pageSize);
    this.pageIndex.restore();
  }

  restore(): void {
    this.next(10);
    this.pageIndex.restore();
  }

  ngOnDestroy(): void {
    this.complete();
  }
}

export abstract class QueryParamsChange extends Observable<Params> implements IQueryParamsChange {
  abstract getValue(): Params;
  abstract queryParamsChange(queryParams: Params): void;
  abstract restore(): void;
}

@Injectable()
export class QueryParams extends BehaviorSubject<Params> implements QueryParamsChange, OnDestroy {
  constructor(private pageIndex: PageIndexChange) {
    super({})
  }

  getValue() {
    return this.value;
  }

  queryParamsChange(queryParams: { [K: string]: any; }): void {
    this.pageIndex.restore();
    this.next({
      ...this.value,
      ...queryParams
    });
  }

  restore(): void {
    this.pageIndex.restore();
    this.next({})
  }

  ngOnDestroy(): void {
    this.complete();
  }
}

export abstract class OrderByChange {
  abstract orderByFieldName: string;
  abstract orderByTypeName: string;
  abstract orderByChange(fieldName: string, orderByType: OrderByType): void;
}

@Injectable()
export class OrderBy implements OrderByChange {
  constructor(private service: QueryParams) {
  }
  // TODO 可以从全局config中获取初始值
  orderByFieldName: string = 'order_context';
  orderByTypeName: string = 'order_sequence';
  orderByChange(fieldName: string, orderByType: OrderByType): void {
    this.service.next({
      [this.orderByFieldName]: fieldName,
      [this.orderByTypeName]: orderByType,
    });
  }
}

/**
 * 表格数据提供者
 * 这里可以拆成 `远程数据提供者`，`本地数据提供者`
 */
@Injectable()
export class PagedData<T extends IDataItem> extends Observable<ResponsePagedData<T>>{
  isFetching$ = new BehaviorSubject<boolean>(false);
  pageIndex$ = this.pipe(map(data => data.info.page));
  pageSize$ = this.pipe(map(data => data.info.results));
  total$ = this.pipe(map(data => data.info.total));
  data$ = this.pipe(map(data => data.data));

  constructor(
    @Inject(PAGED_DATA_SERVICE) public pageDataService: ITableDataProvider<T>,
    public page: PageIndexChange,
    public results: PageSizeChange,
    public queryParams: QueryParamsChange
  ) {
    super();
    this.source = this.getData().pipe(shareReplay(1));
  }


  private getData(): Observable<ResponsePagedData<T>> {
    return combineLatest([this.page, this.results, this.queryParams]).pipe(
      debounceTime(0),
      tap(() => {
        this.isFetching$.next(true)
      }),
      mergeMap(
        ([page, results, queryParams]) => this.pageDataService.getData(page, results, queryParams).pipe(
          catchError(
            () => of({ info: { page: 1, results: 10, total: 9 }, data: [] })
          ),
          tap(() => this.isFetching$.next(false))
        )
      )
    )
  }
}
