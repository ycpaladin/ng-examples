import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo06Component } from './demo06.component';

describe('Demo06Component', () => {
  let component: Demo06Component;
  let fixture: ComponentFixture<Demo06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
