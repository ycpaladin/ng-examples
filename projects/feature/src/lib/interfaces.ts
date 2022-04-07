import { IDeleteDataItemProvider } from "button-group";
import { IDataItem } from "core";
import { ITableDataProvider } from "data-table";

export interface FeatureConfig {

}


export interface IModuleService<T extends IDataItem = IDataItem> extends ITableDataProvider<T>, IDeleteDataItemProvider {

}
