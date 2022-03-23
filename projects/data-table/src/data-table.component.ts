import { Component, OnInit, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { IDataItem, ITableColumn } from './interfaces';
import { OrderBy, OrderByChange, PagedData, PageIndex, PageIndexChange, PageSize, PageSizeChange, QueryParams, QueryParamsChange } from './services';
import { TABLE_COLUMN } from './token';

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

  @ContentChildren(TABLE_COLUMN) listOfColumns!: QueryList<ITableColumn>;

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
    pageData: PagedData<IDataItem>,
  ) {
    this.pageIndex$ = pageData.pageIndex$;
    this.pageSize$ = pageData.pageSize$;
    this.total$ = pageData.total$;
    this.data$ = pageData.data$;
    this.isFetching$ = pageData.isFetching$;
  }

  ngOnInit(): void {
  }

}
