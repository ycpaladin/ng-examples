import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child02',
  templateUrl: './child02.component.html',
  styleUrls: ['./child02.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child02Component implements OnInit {

  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  counter = 0;

  get t2() {
    return this.counter + 1 + this.value;
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const t = () => {
      this.value++;
      this.valueChange.emit(this.value);
      this.cdr.detectChanges();
      // this.cdr.markForCheck();
      setTimeout(t, 1000);
    };
    setTimeout(t, 1000);
    // setInterval(() => {
    //   this.counter++;
    // }, 1000);
  }

}
