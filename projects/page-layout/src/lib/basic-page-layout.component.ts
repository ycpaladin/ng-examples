import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-basic-page-layout',
  templateUrl: './basic-page-layout.component.html',
  styleUrls: ['./basic-page-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicPageLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
