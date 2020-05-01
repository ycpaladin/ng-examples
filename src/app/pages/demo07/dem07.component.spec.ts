import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dem07Component } from './dem07.component';

describe('Dem07Component', () => {
  let component: Dem07Component;
  let fixture: ComponentFixture<Dem07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dem07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dem07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
