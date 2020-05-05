import {
  Component, OnInit, ChangeDetectionStrategy, Input, ContentChildren,
  QueryList, AfterContentInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, ComponentFactoryResolver, ElementRef, ComponentRef
} from '@angular/core';
import { FormItemComponent } from '../form-item/form-item.component';
type LayoutType = 111 | 21 | 12 | 3;

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() type: LayoutType = 111;

  @ContentChildren(FormItemComponent, { read: ComponentRef }) children: QueryList<ComponentRef<FormItemComponent>>;

  @ViewChild('item1', { read: ViewContainerRef }) item1: ViewContainerRef;
  // @ViewChild('item2') item2: TemplateRef<any>;
  // @ViewChild('item3') item3: TemplateRef<any>;
  constructor(
    private factory: ComponentFactoryResolver
  ) { }


  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // console.log(this.children);
    // this.children.changes.subscribe(console.log);

  }

  ngAfterViewInit(): void {
    this.children.forEach(item => {
      // console.log(item);
      // this.item1.insert(item, 1);
    });
    // console.log('item1 ==> ', this.item1);
    // this.item1.createEmbeddedView(this.children);
    // this.item1.insert(this.children[0], 1);
  }


}
