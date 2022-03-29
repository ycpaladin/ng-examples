import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonEditComponent } from './icon-button-edit.component';

describe('IconButtonEditComponent', () => {
  let component: IconButtonEditComponent;
  let fixture: ComponentFixture<IconButtonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
