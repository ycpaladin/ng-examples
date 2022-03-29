import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonViewComponent } from './icon-button-view.component';

describe('IconButtonViewComponent', () => {
  let component: IconButtonViewComponent;
  let fixture: ComponentFixture<IconButtonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
