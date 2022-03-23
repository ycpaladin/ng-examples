import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataItem, ResponseData } from 'data-table';
import { ListDataProvider, SearchSelectOptionProvider, SelectOption, SelectOptionValue, TreeDataProvider, TreeNodeData } from 'data-tree';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreeDataProviderService implements SearchSelectOptionProvider, ListDataProvider, TreeDataProvider {

  constructor(public http: HttpClient) {

  }

  getListData(keywords: string, category?: SelectOptionValue): Observable<IDataItem[]> {
    const { api, searchKey } = category || {};
    return this.http.get<ResponseData<IDataItem[]>>(api as string, {
      params: {
        [searchKey]: keywords
      }
    }).pipe(
      map(data => data.data)
    )
  }

  getTreeData(params?: { [K: string]: any; }): Observable<TreeNodeData[]> {
    return this.http.get<ResponseData<TreeNodeData[]>>(
      '/lms/api/v1/organization-management/tree',
      { params }
    ).pipe(
      map(data => data.data)
    )
  }

  getOptions(): Observable<SelectOption[]> {
    return of([
      { label: '部门', value: { api: '/lms/api/v1/department-management/list', searchKey: 'search_global__icontains' } },
      { label: '组织', value: { api: '/lms/api/v1/organization-management/list', searchKey: 'search_global__icontains' } },
    ])
  }
}
