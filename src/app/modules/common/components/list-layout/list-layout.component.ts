import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-layout',
  templateUrl: './list-layout.component.html',
  styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<void>;
  @Input() bodyTemplate: TemplateRef<void>;
  @Input() buttonTemplate: TemplateRef<void> | string;

  constructor() { }

  ngOnInit() {
  }

}
