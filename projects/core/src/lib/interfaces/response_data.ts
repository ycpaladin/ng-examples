
export type ResponseDataResult = 'ok';

export interface ResponseData<T> {
  data: T;
  result: ResponseDataResult;
}
