import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataItem } from 'core';
import { ITableDataProvider, Params, ResponsePagedData } from 'data-table';
import { Observable } from 'rxjs';


@Injectable()
export class PageDataProvider<T extends IDataItem> implements ITableDataProvider<T> {

  constructor(
    public http: HttpClient,
  ) {
  }

  getData(page: number, results: number, queryParams: Params): Observable<ResponsePagedData<T>> {
    return this.http.get<ResponsePagedData<T>>(
      '/lms/api/v1/test_task/data-report/test-allocation?assume_user=admin&bitmap=1111111111', {
      params: {
        page,
        results,
        ...queryParams
      }
    })
  }


}
