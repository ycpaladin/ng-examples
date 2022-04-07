import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lib-main-page-layout',
  templateUrl: './main-page-layout.component.html',
  styleUrls: ['./main-page-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
