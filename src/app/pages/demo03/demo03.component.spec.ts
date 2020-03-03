import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo03Component } from './demo03.component';

describe('Demo03Component', () => {
  let component: Demo03Component;
  let fixture: ComponentFixture<Demo03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
