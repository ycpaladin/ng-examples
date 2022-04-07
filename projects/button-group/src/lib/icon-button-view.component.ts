import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, TemplateRef, Input, Output, Inject, ViewChild, forwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDataItem } from 'core';
import { IButton, IDataContext } from './interfaces';
import { DATA_CONTEXT, ICON_BUTTON } from './token';

@Component({
  selector: 'lib-icon-button-view',
  template: `
  <ng-template #buttonTemplate>
    <i nz-icon nz-tooltip [nzTooltipTitle]="buttonText" [nzType]="buttonType" nzTheme="outline" (click)="onClick()" *ngIf="!buttonDisabled else defaultView"></i>
    <ng-template #defaultView>
      <i nz-icon [nzType]="buttonType" nzTheme="outline" class="disabled"></i>
    </ng-template>
  </ng-template>
  `,
  styleUrls: ['./icon-button-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ICON_BUTTON, useExisting: forwardRef(() => IconButtonViewComponent) }]
})
export class IconButtonViewComponent implements OnInit, IButton {

  buttonText: string = '查看';
  @Input() buttonDisabled: boolean;
  buttonType: string = 'eye';
  @Output() click = new EventEmitter<void>();
  @ViewChild('buttonTemplate', { static: true }) template: TemplateRef<any>;

  onClick(): void {
    this.router.navigate([this.dataContext.data.id], { relativeTo: this.activatedRoute });
  }

  constructor(
    @Inject(DATA_CONTEXT)
    public dataContext: IDataContext<IDataItem>,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.click.subscribe(this.onClick.bind(this));
  }


  ngOnInit(): void {
  }

}
