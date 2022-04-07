import { ActivatedRoute, Router } from '@angular/router';
import { Inject, Pipe, PipeTransform } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { TreeModuleConfig, TreeNodeData } from './interfaces';
import { TREE_CONFIG } from './token';

@Pipe({
  name: 'breadcrumbUrl'
})
export class BreadcrumbUrlPipe implements PipeTransform {

  constructor(
    @Inject(TREE_CONFIG) public config: TreeModuleConfig,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {

  }

  transform(value: TreeNodeData | NzTreeNodeOptions, ...args: unknown[]): string {
    const { level } = value;
    const entity = Object.entries(this.config.expandKeyRoute).find(([k, v]) => v.includes(level));
    if (entity) {
      const [k] = entity;
      // return `${k}/${value.id}`;
      return this.router.createUrlTree([k, value.id], { relativeTo: this.activatedRoute }).toString();
    }
    return null;
  }


}
