/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BodegaListComponent } from './bodega-list.component';

describe('BodegaListComponent', () => {
  let component: BodegaListComponent;
  let fixture: ComponentFixture<BodegaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodegaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('BodegaListComponent', () => {
    it('debería estar definido', () => {
      expect(BodegaListComponent).toBeDefined();
    });
  });
});
