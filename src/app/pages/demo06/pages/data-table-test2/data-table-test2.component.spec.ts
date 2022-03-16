import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableTest2Component } from './data-table-test2.component';

describe('DataTableTest2Component', () => {
  let component: DataTableTest2Component;
  let fixture: ComponentFixture<DataTableTest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableTest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
