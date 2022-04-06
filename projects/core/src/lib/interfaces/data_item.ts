
/**
 * 所有数据模型的基类
 */
export interface IDataItem extends SafeType {
  id: number;

}


export interface SafeType {
  [K: string]: any;
}
