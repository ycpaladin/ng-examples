import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { catchError, debounceTime, mergeMap, tap } from 'rxjs/operators';
import { MODULE_CONFIG, PAGED_DATA_SERVICE } from "./consts";
import { DataTableModuleConfig, IDataItem, IPageDataProvider, IPageService, Params, ResponsePagedData } from "./interfaces";


@Injectable()
export class PageIndex extends BehaviorSubject<number> {
  constructor() {
    super(1)
  }
}

@Injectable()
export class PageSize extends BehaviorSubject<number> {
  constructor() {
    super(10)
  }
}

@Injectable()
export class QueryParams extends BehaviorSubject<Params> {
  constructor() {
    super({})
  }
}

@Injectable()
export class PagedService<T extends IDataItem> implements IPageService<T>{

  isFetching$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PAGED_DATA_SERVICE) public service: IPageDataProvider<T>,
    public page: PageIndex,
    public results: PageSize,
    public queryParams: QueryParams
  ) {

  }

  getData(): Observable<ResponsePagedData<T>> {
    return combineLatest([this.page, this.results, this.queryParams]).pipe(
      debounceTime(0),
      tap((d) => {
        this.isFetching$.next(true)
      }),
      mergeMap(
        ([page, results, queryParams]) => this.service.getData(page, results, queryParams).pipe(
          catchError(
            () => of({ info: { page: 1, results: 10, total: 9 }, data: [] })
          ),
          tap(() => this.isFetching$.next(false))
        )
      )
    )
  }
}

@Injectable()
export class PageDataProvider<T extends IDataItem> implements IPageDataProvider<T> {

  constructor(
    @Inject(MODULE_CONFIG) @Optional() public config: DataTableModuleConfig,
    public http: HttpClient,
  ) {
  }

  getData(page: number, results: number, queryParams: Params): Observable<ResponsePagedData<T>> {
    return this.http.get<ResponsePagedData<T>>(this.config.url, {
      params: {
        page,
        results,
        ...queryParams
      }
    })
  }


}

