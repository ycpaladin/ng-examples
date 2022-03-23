import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { TreeNodeData } from "./interfaces";


export const f = (level: number[], id: number) => {
  return function find(data: TreeNodeData[], array: TreeNodeData[], dataLevel: number = 0, cb?: () => void): TreeNodeData[] {
    return data.reduce((prev, curr) => {
      if (curr.id === id && level.includes(dataLevel)) {
        array.push({ ...curr, level: dataLevel });
        if (cb) {
          cb();
        }
      }
      return find(curr.children, prev, dataLevel + 1, () => {
        array.unshift({ ...curr, level: dataLevel });
        if (cb) {
          cb();
        }
      })
    }, array);
  }
}

export const getParams = (function getParams(ar: ActivatedRoute, array: Observable<Params>[] = []): Observable<Params>[] {
  return ar.children.reduce((prev, curr) => {
    prev.push(curr.params);
    return getParams(curr, prev);
  }, array);
}); // (activatedRoute)
