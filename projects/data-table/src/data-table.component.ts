import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  Input,
  forwardRef,
  Injector,
} from "@angular/core";
import { IDataItem } from "core";
import { InputBoolean } from "ng-zorro-antd/core/util";
import { Observable } from "rxjs";

import { IDisabledBy, ITableColumn } from "./interfaces";
import {
  DataCheckStrategy,
  DataCheckStrategyProvider,
  OrderByProvider,
  PagedData,
  PageIndexChange,
  PageIndexProvider,
  PageSizeChange,
  PageSizeProvider,
  QueryParamsProvider,
} from "./services";
import { DISABLED_BY, TABLE_COLUMN } from "./token";

const loop = () => false;
@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // 配置在此处，不会缓存查询条件
    PagedData,
    DataCheckStrategyProvider,
    PageIndexProvider,
    PageSizeProvider,
    OrderByProvider,
    QueryParamsProvider,
    { provide: DISABLED_BY, useExisting: forwardRef(() => DataTableComponent) },
  ],
})
export class DataTableComponent implements OnInit, IDisabledBy {
  _dataCheck: DataCheckStrategy;

  /**
   * 是否启用单选
   */
  @Input() @InputBoolean() nzSelection = false;
  @Input() disabledBy: (item: IDataItem) => boolean | Observable<boolean> =
    loop;
  @Input() set dataCheck(value: "default" | "memory") {
    if (value === "memory") {
      // TODO...
    } else {
      this._dataCheck = this.injector.get(DataCheckStrategy);
    }
  }

  pageIndex$!: Observable<number>;
  pageSize$!: Observable<number>;
  total$!: Observable<number>;
  data$!: Observable<IDataItem[]>;
  isFetching$!: Observable<boolean>;
  // dataCheck: DataCheckStrategy;

  @ContentChildren(TABLE_COLUMN) listOfColumns!: QueryList<ITableColumn>;

  onPageIndexChange(pageIndex: number): void {
    this.page.pageIndexChange(pageIndex);
  }

  onPageSizeChange(pageSize: number): void {
    this.results.pageSizeChange(pageSize);
  }

  constructor(
    private injector: Injector,
    private page: PageIndexChange,
    private results: PageSizeChange,
    // private orderBy: OrderByChange,
    pageData: PagedData<IDataItem>
  ) {
    // console.log(dataCheck);
    this.pageIndex$ = pageData.pageIndex$;
    this.pageSize$ = pageData.pageSize$;
    this.total$ = pageData.total$;
    this.data$ = pageData.data$;
    this.isFetching$ = pageData.isFetching$;
    // this._dataCheck = this.injector.get(DataCheckStrategy);
  }

  ngOnInit(): void {
    // TODO 动态获取 DataCheckStrategy
    this._dataCheck = this.injector.get(DataCheckStrategy);
  }
}
