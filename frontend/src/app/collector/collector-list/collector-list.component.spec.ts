/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import * as faker from "faker"

import { CollectorListComponent } from './collector-list.component';
import { Collector } from '../../../models/collector'
import { RouterTestingModule } from '@angular/router/testing';

describe('CollectorListComponent', () => {
  let component: CollectorListComponent;
  let fixture: ComponentFixture<CollectorListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListComponent);
    component = fixture.componentInstance;
    component.collectors = []
    for (let i = 0; i < 3; i++) {
      component.collectors.push(
        new Collector(
          i,
          faker.name.findName(),
          faker.datatype.number(),
          faker.internet.email(),
          [],
          [],
          []
        )
      );
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Component has no collectors", () => {
    component.collectors = [];
    fixture.detectChanges();
    expect(debug.query(By.css(".no-collectors")).nativeElement.textContent.trim()).toBe("There are no collectors");
   });

  it("Component has at least one collector", () => {
    fixture.detectChanges();
    expect(debug.query(By.css("tbody tr")).childNodes.length).toBeGreaterThan(0);
   });
});
