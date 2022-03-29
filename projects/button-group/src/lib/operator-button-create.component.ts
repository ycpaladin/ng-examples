import { Component, OnInit, ChangeDetectionStrategy, forwardRef, EventEmitter, TemplateRef, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IButton } from './interfaces';
import { BUTTON } from './token';

@Component({
  selector: 'lib-operator-button-create',
  template: `
  <ng-template #buttomTemplate>
    <button nz-button nz-tooltip [nzTooltipTitle]="buttonText" [nzType]="buttonType" (click)="onClick()">
      {{buttonText}}
    </button>
  </ng-template>
  `,
  styleUrls: ['./operator-button-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BUTTON, useExisting: forwardRef(() => OperatorButtonCreateComponent) }]
})
export class OperatorButtonCreateComponent implements OnInit, IButton {

  @Input() buttonText: string = '新增';
  @Input() buttonDisabled: boolean;
  @Input() buttonType: 'primary' = 'primary';
  @Output() click = new EventEmitter<void>();
  @ViewChild('buttomTemplate', { static: true }) template: TemplateRef<any>;

  onClick(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.click.subscribe(this.onClick.bind(this));
  }

  ngOnInit(): void {
  }

}
