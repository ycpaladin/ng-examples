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


export interface IPageService<T extends IDataItem> {
  getData(): Observable<ResponsePagedData<T>>;
}

export interface IPageDataProvider<T extends IDataItem> {
  getData(page: number, result: number, queryParams: Params): Observable<ResponsePagedData<T>>;
}


export interface DataTableModuleConfig {
  url: string;
  moduleName: string;
  searchConfig: SearchGroupConfig;
}
