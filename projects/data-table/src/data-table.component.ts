import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Optional } from '@angular/core';
import { DataTableModuleConfig, IDataItem } from './interfaces';
import { PagedService, PageIndex, PageIndexChange, PageSize, PageSizeChange, QueryParams, QueryParamsChange } from './services';
import { map, shareReplay } from 'rxjs/operators';
import { MODULE_CONFIG } from './consts';

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
    { provide: PageIndexChange, useExisting: PageIndex },
    { provide: PageSizeChange, useExisting: PageSize },
    { provide: QueryParamsChange, useExisting: QueryParams },
    PagedService
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
    @Inject(MODULE_CONFIG) @Optional() public config: DataTableModuleConfig,
    public page: PageIndexChange,
    public results: PageSizeChange,
    public service: PagedService<IDataItem>,
  ) {
    const data$ = service.getData().pipe(shareReplay());
    this.pageIndex$ = data$.pipe(map(data => data.info.page));
    this.pageSize$ = data$.pipe(map(data => data.info.results));
    this.total$ = data$.pipe(map(data => data.info.total));
    this.data$ = data$.pipe(map(data => data.data));
    this.isFetching$ = service.isFetching$;
  }

  ngOnInit(): void {
  }

}
