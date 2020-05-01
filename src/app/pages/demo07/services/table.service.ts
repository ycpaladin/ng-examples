import { ITableService } from '../models';
import { Observable } from 'rxjs';

export class TableService implements ITableService<any>  {

  constructor() { }
  getData(pageIndex: number, pageSize: number, params?: { [key: string]: any; }): Observable<any[]> {
    throw new Error('Method not implemented.');
  }

}
