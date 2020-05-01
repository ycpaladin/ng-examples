import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-demo06',
  templateUrl: './demo06.component.html',
  styleUrls: ['./demo06.component.scss']
})
export class Demo06Component implements OnInit, OnChanges {


  value = 1;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('================');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.value += 1;
    }, 5000);
  }

}
