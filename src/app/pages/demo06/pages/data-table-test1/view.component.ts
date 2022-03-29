import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
