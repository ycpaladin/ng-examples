import { ICON_BUTTON } from './token';
import { Component, OnInit, ChangeDetectionStrategy, forwardRef, EventEmitter, TemplateRef, Input, Output, ViewChild } from '@angular/core';
import { IButton } from './interfaces';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-icon-button-edit',
  templateUrl: './icon-button-edit.component.html',
  styleUrls: ['./icon-button-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: ICON_BUTTON, useExisting: forwardRef(() => IconButtonEditComponent) }]
})
export class IconButtonEditComponent implements OnInit, IButton {

  buttonText: string;
  @Input() buttonDisabled: boolean;
  buttonType: string = 'edit';
  @Output() click = new EventEmitter<void>();
  @ViewChild('editButtonTemplate', { static: true }) template: TemplateRef<any>;

  onClick(): void {
    // this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.click.subscribe(this.onClick.bind(this));
  }

  ngOnInit(): void {
  }

}
