import { DATA_CONTEXT, ICON_BUTTON } from './token';
import { Component, OnInit, ChangeDetectionStrategy, forwardRef, EventEmitter, TemplateRef, Input, Output, ViewChild, Inject } from '@angular/core';
import { IButton, IDataContext } from './interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { IDataItem } from 'data-table';

@Component({
  selector: 'lib-icon-button-edit',
  template: `
  <ng-template #buttonTemplate>
    <i nz-icon  nz-tooltip [nzTooltipTitle]="buttonText" [nzType]="buttonType" nzTheme="outline" (click)="onClick()" *ngIf="!buttonDisabled else defaultView"></i>
    <ng-template #defaultView>
      <i nz-icon [nzType]="buttonType" nzTheme="outline" class="disabled"></i>
    </ng-template>
  </ng-template>
  `,
  styleUrls: ['./icon-button-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ICON_BUTTON, useExisting: forwardRef(() => IconButtonEditComponent) }]
})
export class IconButtonEditComponent implements OnInit, IButton {

  buttonText: string = '编辑';
  @Input() buttonDisabled: boolean;
  buttonType: string = 'edit';
  @Output() click = new EventEmitter<void>();
  @ViewChild('buttonTemplate', { static: true }) template: TemplateRef<any>;

  onClick(): void {
    this.router.navigate(['edit', this.dataContext.data.id], { relativeTo: this.activatedRoute });
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
