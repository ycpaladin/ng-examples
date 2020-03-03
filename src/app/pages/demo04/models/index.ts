import { Observable, of } from 'rxjs';

export type State = 'OK' | 'ERROR';

export interface IData {
  id: number | string;
  state: State;
}

export interface IOnClick<T extends IData> {
  onClick(data: T): void;
}


export type User = IData & {
  name: string;
  age: number;
};

export type ResponseResult = 'ok';
export interface IResponseData<T extends IData> {
  result: ResponseResult;
  data: T[];
}

export abstract class ITableService<T extends IData> {

  abstract getPagedData(): Observable<IResponseData<T>>;
}

export abstract class IModuleComponent<T extends IData> {
  public service: ITableService<T>;
}
