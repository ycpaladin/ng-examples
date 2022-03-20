import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-data-tree-test',
  templateUrl: './data-tree-test.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreeTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
