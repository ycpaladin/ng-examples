import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeleteDataItemProvider } from 'button-group';
import { Observable, of } from 'rxjs';

import { IDataItem } from 'core';
import { ITableDataProvider, Params, ResponsePagedData } from 'data-table';


@Injectable()
export class PageDataProvider<T extends IDataItem> implements ITableDataProvider<T>, IDeleteDataItemProvider {

  constructor(
    public http: HttpClient,
  ) {
  }

  deleteById(id: number): Observable<boolean | IDataItem> {
    return of(true)
  }

  getData(page: number, results: number, queryParams: Params): Observable<ResponsePagedData<T>> {
    return this.http.get<ResponsePagedData<T>>(
      '/lms/api/v1/test_task/tr_track/current_cp_tests?test_status=1&assume_user=admin&bitmap=1111111111', {
      params: {
        page,
        results,
        ...queryParams
      }
    })
  }


}
