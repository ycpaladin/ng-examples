import { ComponentFactoryResolver, Directive, Injector, Input, Type, ViewContainerRef, OnInit, OnDestroy, ComponentRef } from '@angular/core';
import { ControlBase } from './base';
import { ControlDateComponent } from './control-date.component';
import { ControlSelectComponent } from './control-select.component';
import { ControlTextComponent } from './control-text.component';
import { SearchControl } from './interfaces';

@Directive({
  selector: '[control-factory]'
})
export class ControlFactoryDirective implements OnInit, OnDestroy {

  @Input() item!: SearchControl;

  componentRef!: ComponentRef<ControlBase>;
  createControl(type: Type<ControlBase>): void {
    const componentFactory = this.resolve.resolveComponentFactory(type);
    this.componentRef = this.container.createComponent(componentFactory, 0, this.injector);
    this.componentRef.instance.item = this.item;
  }

  constructor(
    public resolve: ComponentFactoryResolver,
    public container: ViewContainerRef,
    public injector: Injector
  ) { }


  ngOnInit(): void {
    switch (this.item.type) {
      case 'select':
        this.createControl(ControlSelectComponent);
        break;
      case 'date':
        this.createControl(ControlDateComponent);
        break;
      case 'text':
      default:
        this.createControl(ControlTextComponent);
        break;
    }
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

}
