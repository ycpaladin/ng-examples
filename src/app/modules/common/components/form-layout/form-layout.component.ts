import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
type LayoutType = 111 | 21 | 12 | 1;

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent implements OnInit {
  @Input() type: LayoutType = 111;

  constructor() { }

  ngOnInit(): void {
  }

}
