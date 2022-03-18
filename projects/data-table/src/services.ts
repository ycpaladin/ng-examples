import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { catchError, debounceTime, mergeMap, tap } from 'rxjs/operators';
import { MODULE_CONFIG, PAGED_DATA_SERVICE } from "./consts";
import { DataTableModuleConfig, IDataItem, IPageDataProvider, IPageIndexChange, IPageService, IPageSizeChange, IQueryParamsChange, Params, ResponsePagedData } from "./interfaces";


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
    this.pageIndex.restore();
    this.next(pageSize);
  }

  restore(): void {
    this.pageIndex.restore();
    this.next(10);
  }

  ngOnDestroy(): void {
    this.complete();
  }
}

export abstract class QueryParamsChange extends Observable<{ [K: string]: any; }> implements IQueryParamsChange {
  abstract getValue(): { [K: string]: any; };
  abstract queryParamsChange(queryParams: { [K: string]: any; }): void;
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

@Injectable()
export class PagedService<T extends IDataItem> implements IPageService<T>{

  isFetching$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PAGED_DATA_SERVICE) public pageDataService: IPageDataProvider<T>,
    public page: PageIndexChange,
    public results: PageSizeChange,
    public queryParams: QueryParamsChange
  ) {
  }

  getData(): Observable<ResponsePagedData<T>> {
    return combineLatest([this.page, this.results, this.queryParams]).pipe(
      debounceTime(0),
      tap((d) => {
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


