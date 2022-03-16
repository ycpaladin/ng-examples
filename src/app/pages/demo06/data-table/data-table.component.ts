import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Optional } from '@angular/core';
import { DataTableModuleConfig, IDataItem, ResponsePagedData } from './interfaces';
import { PagedService, PageIndex, PageSize, QueryParams } from './services';
import { map, shareReplay } from 'rxjs/operators';
import { MODULE_CONFIG } from './consts';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PageIndex, PageSize, QueryParams, PagedService]
})
export class DataTableComponent implements OnInit {

  pageIndex$!: Observable<number>;
  pageSize$!: Observable<number>;
  total$!: Observable<number>;
  data$!: Observable<IDataItem[]>;
  isFetching$!: Observable<boolean>;

  onPageIndexChange(pageIndex: number): void {
    this.page.next(pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.results.next(pageSize);
    this.page.next(1);
  }

  constructor(
    @Inject(MODULE_CONFIG) @Optional() public config: DataTableModuleConfig,
    public page: PageIndex,
    public results: PageSize,
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
