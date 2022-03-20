import { NzTreeNode } from "ng-zorro-antd/tree";

export interface SelectOption {
  label: string;
  value: string
}

export interface ITreeSearch {
  onSearchTextChange(keywords: string): void;
  onSelectedOptionChange(option: SelectOption): void;
}


export interface ITree {
  onTreeNodeSelect(node: NzTreeNode): void;
}


export interface TreeNodeData {
  id: number;
  key: string;
  title: string;
  // label: string;
  // value: string;
  children: TreeNodeData[]
}


export interface TreeModuleConfig {
  dataProvideApi?: string;
  moduleName?: string;
  searchSelectOptions?: SelectOption[];
}
