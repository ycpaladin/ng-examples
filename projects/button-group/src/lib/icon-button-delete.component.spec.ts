import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonDeleteComponent } from './icon-button-delete.component';

describe('IconButtonDeleteComponent', () => {
  let component: IconButtonDeleteComponent;
  let fixture: ComponentFixture<IconButtonDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
