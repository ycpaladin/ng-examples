import { Control } from './interfaces';
import { Directive, Input, Optional } from "@angular/core";
import { QueryParamsChange } from 'projects/data-table/src/services';

@Directive()
export abstract class ControlBase<T = Control, V = any> {
  @Input() item!: T;

  value!: V;

  constructor(@Optional() public queryParams: QueryParamsChange) {
  }

  onNgModelChange(next: V): void {
    this.queryParams.queryParamsChange({
      [(this.item as any).fieldName]: next
    })
  }
}
