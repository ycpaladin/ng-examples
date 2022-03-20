import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { IDataItem } from './interfaces';
import { OrderBy, OrderByChange, PagedData, PageIndex, PageIndexChange, PageSize, PageSizeChange, QueryParams, QueryParamsChange } from './services';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // 配置在此处，不会缓存查询条件
    PageIndex,
    PageSize,
    QueryParams,
    OrderBy,
    { provide: PageIndexChange, useExisting: PageIndex },
    { provide: PageSizeChange, useExisting: PageSize },
    { provide: QueryParamsChange, useExisting: QueryParams },
    { provide: OrderByChange, useExisting: OrderBy },
    // PagedService
    PagedData
  ]
})
export class DataTableComponent implements OnInit {

  pageIndex$!: Observable<number>;
  pageSize$!: Observable<number>;
  total$!: Observable<number>;
  data$!: Observable<IDataItem[]>;
  isFetching$!: Observable<boolean>;

  onPageIndexChange(pageIndex: number): void {
    this.page.pageIndexChange(pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.results.pageSizeChange(pageSize);
  }

  constructor(
    private page: PageIndexChange,
    private results: PageSizeChange,
    private orderBy: OrderByChange,
    data$: PagedData<IDataItem>,
  ) {
    // const data$ = service.getData().pipe(shareReplay());

    this.pageIndex$ = data$.pipe(map(data => data.info.page));
    this.pageSize$ = data$.pipe(map(data => data.info.results));
    this.total$ = data$.pipe(map(data => data.info.total));
    this.data$ = data$.pipe(map(data => data.data));
    this.isFetching$ = data$.isFetching$;
  }

  ngOnInit(): void {
  }

}
