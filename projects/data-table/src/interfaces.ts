import { TemplateRef } from '@angular/core';
import { IDataItem, ResponseData, SafeType } from 'core';
import { Observable } from "rxjs";

export interface PagedInfo {
  page: number;
  results: number;
  total: number;
}

export type Params = SafeType;

export type ResponsePagedData<T extends IDataItem> = ResponseData<T[]> & { info: PagedInfo };

/**
 * Table数据提供者
 */
export interface ITableDataProvider<T extends IDataItem> {
  getData(page: number, result: number, queryParams: Params): Observable<ResponsePagedData<T>>;
}


export interface IRestoreData {
  restore(): void;
}

export interface IPageIndexChange extends IRestoreData {
  pageIndexChange(pageIndex: number): void;
}

export interface IPageSizeChange extends IRestoreData {
  pageSizeChange(pageSize: number): void;
}

export interface IQueryParamsChange extends IRestoreData {
  queryParamsChange(queryParams: Params): void;
  getValue(): Params;
}

export interface ITableColumn {
  nzTitle: string | TemplateRef<void>;
  dataKey: string;
  sortKey?: string;
  searchKey?: string;
  contentFromContentChild: TemplateRef<void>;
}

export interface ITableColumnContent {
  templateRef: TemplateRef<ITableColumnContentData>
}

export interface ITableColumnContentData {

}

export type OrderByType = 'asc' | 'desc';


export interface IDisabledBy {
  disabledBy: DisableByFn;
}


export interface DisableByFn {
  (item: IDataItem): boolean | Observable<boolean>;
}

/**
 * 数据选中策略
 * ```
 * `default`：默认，极小的概率会出现数据不同步的问题
 * `memory`：翻页记忆，pageIndex或者pageSize发生变化不会清除之前选中的数据, 可能会出现数据不同步的问题
 * `all`：忽略pageIndex和pageSize, 会选中所有符合查询条件的数据，数据量过大会存在性能问题
 * ```
 */
export type CheckStrategy = 'default' | 'memory' | 'all';
