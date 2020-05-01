import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child01',
  templateUrl: './child01.component.html',
  styleUrls: ['./child01.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child01Component implements OnInit {

  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  onChange(e: any) {
    this.value = e.target.value;
    this.valueChange.emit(this.value);
  }

}
