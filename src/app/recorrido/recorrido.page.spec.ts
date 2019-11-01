import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoPage } from './recorrido.page';

describe('RecorridoPage', () => {
  let component: RecorridoPage;
  let fixture: ComponentFixture<RecorridoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecorridoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
