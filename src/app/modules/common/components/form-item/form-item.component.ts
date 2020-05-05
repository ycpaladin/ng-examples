import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, ContentChild, AfterContentInit } from '@angular/core';
import { NgControl, FormControlName, FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent implements OnInit, AfterContentInit {

  @Input() title: string;
  @Input() error: TemplateRef<any>;
  @ContentChild(NgControl, { static: false }) defaultValidateControl: FormControlName | FormControlDirective;
  @ContentChild(TemplateRef, { static: false }) errorTip: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // console.log(this.defaultValidateControl);
  }
}
