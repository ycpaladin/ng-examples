import { Observable } from 'rxjs';


export interface ITableService<T = any> {

  getData(pageIndex: number, pageSize: number, params?: { [key: string]: any }): Observable<T[]>;

}
