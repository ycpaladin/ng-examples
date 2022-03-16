import { BehaviorSubject } from 'rxjs';
import { Control, SearchControl } from './interfaces';
import { Directive, Input, Optional } from "@angular/core";

@Directive()
export abstract class ControlBase<T = Control, V = any> {
  @Input() item!: T;

  value!: V;

  constructor(@Optional() public queryParams: BehaviorSubject<any>) {
  }

  onNgModelChange(next: V): void {
    const { value } = this.queryParams;
    this.queryParams.next({
      ...value,
      [(this.item as any).fieldName]: next
    })
  }
}
