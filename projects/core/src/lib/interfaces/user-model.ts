import { IDataItem, SafeType } from './data-item';


export interface UserModel extends IDataItem {
  username: string;
  display_name: string;
}


export interface LoginModel {
  username: string;
  password: string;
  extra: SafeType;
}
