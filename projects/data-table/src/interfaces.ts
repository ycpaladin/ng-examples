import { SearchGroupConfig } from "projects/search-group/src/interfaces";
import { Observable } from "rxjs";

export interface IDataItem {
  id: number;
}

export interface ResponseData<T> {
  data: T
}

export interface PagedInfo {
  page: number;
  results: number;
  total: number;
}

export type Params = { [K: string]: any };

export type ResponsePagedData<T extends IDataItem> = ResponseData<T[]> & { info: PagedInfo };

/**
 * Table数据提供者
 */
export interface ITableDataProvider<T extends IDataItem> {
  getData(page: number, result: number, queryParams: Params): Observable<ResponsePagedData<T>>;
}


export interface DataTableModuleConfig {
  url: string;
  moduleName: string;
  searchConfig: SearchGroupConfig;
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
  queryParamsChange(queryParams: { [K: string]: any }): void;
  getValue(): { [K: string]: any };
}


export type OrderByType = 'asc' | 'desc';
