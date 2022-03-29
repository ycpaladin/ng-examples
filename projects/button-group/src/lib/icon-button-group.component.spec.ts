import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonGroupComponent } from './icon-button-group.component';

describe('IconButtonGroupComponent', () => {
  let component: IconButtonGroupComponent;
  let fixture: ComponentFixture<IconButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
