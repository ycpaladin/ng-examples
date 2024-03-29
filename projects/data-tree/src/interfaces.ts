import { Observable } from 'rxjs';
import { NzTreeNode } from "ng-zorro-antd/tree";
import { EventEmitter, Type } from '@angular/core';
import { ListDataProvider, TreeDataProvider } from './services';



export interface SelectOptionValue {
  api: string;
  searchKey: string;
}

export interface SelectOption {
  label: string;
  value: SelectOptionValue;
  placehlder?: string;
}

export interface ITreeSearch {
  onSearchTextChange(keywords: string): void;
  onSelectedOptionChange(option: SelectOptionValue): void;
}


export interface ITree {
  // onTreeNodeSelect(node: NzTreeNode): void;
  onTreeNodeSelect: EventEmitter<NzTreeNode>;
}


export interface TreeNodeData {
  id: number;
  key: string;
  title: string;
  level?: number;
  // label: string;
  // value: string;
  children: TreeNodeData[]
}


export interface SearchSelectOptionProvider {
  getOptions(): Observable<SelectOption[]>;
}

export interface TreeModuleConfig {
  treeDataProvider?: string | Type<TreeDataProvider>;
  listDataProvider?: string | Type<ListDataProvider>;
  moduleName?: string;
  searchSelectOptionsProvider?: SelectOption[] | Observable<SelectOption[]> | Type<SearchSelectOptionProvider>;
  expandKeyRoute: ExpandKeyRouteConifg;
}

export interface ExpandKeyRouteConifg {
  [K: string]: number[];
}

export interface TreeSearchData {
  keywords?: string;
  category?: SelectOptionValue;
}
