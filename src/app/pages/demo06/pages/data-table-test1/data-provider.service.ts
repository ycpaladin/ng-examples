import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDataItem, ITableDataProvider, Params, ResponsePagedData } from 'projects/data-table/src/interfaces';
import { Observable } from 'rxjs';


@Injectable()
export class PageDataProvider<T extends IDataItem> implements ITableDataProvider<T> {

  constructor(
    // @Inject(MODULE_CONFIG) @Optional() public config: DataTableModuleConfig,
    public http: HttpClient,
  ) {
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
