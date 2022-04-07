import { Inject, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, combineLatest, isObservable, Observable, of, Subject, Subscription } from "rxjs";
import { catchError, debounceTime, map, mergeMap, tap, shareReplay, takeUntil } from 'rxjs/operators';
import { DISABLED_BY, PAGED_DATA_SERVICE } from "./token";
import { ITableDataProvider, IPageIndexChange, IPageSizeChange, IQueryParamsChange, OrderByType, Params, ResponsePagedData, IDisabledBy, DisableByFn } from "./interfaces";
import { IDataItem } from "core";


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
export class PagedData<T extends IDataItem = IDataItem> extends Observable<ResponsePagedData<T>>{
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

  refresh(): void {
    const sub$ = this.subscribe(({ info: { page }, data }) => {
      if (data.length === 1 && page > 1) {
        this.page.pageIndexChange(page - 1);
      } else {
        this.page.pageIndexChange(page);
      }
      Promise.resolve().then(() => sub$.unsubscribe());
    });
  }


  private getData(): Observable<ResponsePagedData<T>> {
    return combineLatest([this.page, this.results, this.queryParams]).pipe(
      debounceTime(0),
      tap(() => {
        this.isFetching$.next(true)
      }),
      mergeMap(
        ([page, results, queryParams]) => this.pageDataService.getData(page, results, queryParams).pipe(
          catchError(() => of({ info: { page: 1, results: 10, total: 9 }, data: [] } as ResponsePagedData<T>)),
          tap(() => this.isFetching$.next(false))
        )
      )
    )
  }
}

/**
 * 数据选择策略
 */
// @Injectable()
export abstract class DataCheckStrategy {

  indeterminate = false;
  allChecked = false;
  setOfCheckedId = new Map<number, boolean>();
  destory$ = new Subject<void>();
  data!: IDataItem[]

  allItemsCheckChange(checked: boolean): void {
    this.data.forEach(({ id }) => {
      if (checked) {
        this.setOfCheckedId.set(id, checked);
      } else {
        this.setOfCheckedId.delete(id);
      }
    });
    this.allChecked = checked;
    this.refreshCheckedStatus();
  }

  itemCheckedChange(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.set(id, checked);
    } else {
      this.setOfCheckedId.delete(id);
    }
    this.refreshCheckedStatus();
  }

  protected refreshCheckedStatus(): void {
    this.allChecked = this.data.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = this.data.some(({ id }) => this.setOfCheckedId.has(id)) && !this.allChecked;
  }

  constructor(public data$: Observable<IDataItem[]>, public disabledBy?: DisableByFn) {
    data$.pipe(
      mergeMap(data => {
        return new Observable<IDataItem[]>(subscribe => {
          const subscription = new Subscription();
          if (!this.disabledBy) {
            subscribe.next(data);
          } else {
            const _data = data.reduce<IDataItem[]>((prev, curr) => {
              const _item = this.disabledBy(curr)
              if (isObservable(_item)) {
                subscription.add(
                  _item.subscribe(v => {
                    if (!v) {
                      prev.push(curr);
                    }
                  })
                );
              } else {
                if (!_item) {
                  prev.push(curr);
                }
              }
              return prev;
            }, []);
            subscribe.next(_data);
          }
          return () => {
            subscribe.complete();
            subscription.unsubscribe();
          }
        })
      }),
      takeUntil(this.destory$)
    ).subscribe(data => {
      this.data = data;
      this.pageDataLoaded();
    });
  }

  abstract pageDataLoaded(): void;

}

/**
 * 默认的数据选中策略
 */
@Injectable()
export class DataCheckDefaultStrategy extends DataCheckStrategy implements OnDestroy {
  constructor(data$: PagedData, @Inject(DISABLED_BY) disabledBy: IDisabledBy) {
    super(data$.data$, disabledBy.disabledBy)
  }

  pageDataLoaded(): void {
    this.setOfCheckedId.clear();
    this.refreshCheckedStatus();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

}

// 记忆翻页选择策略

// 全选，忽略翻页针对所有符合查询条件的数据策略
