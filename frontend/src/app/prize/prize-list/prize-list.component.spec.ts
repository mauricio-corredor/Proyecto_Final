/* tslint:disable:no-unused-variable */
import { TestBed, getTestBed, inject, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrizeListComponent } from './prize-list.component';
import { Prize } from 'src/models/prize';
import { HttpTestingController } from '@angular/common/http/testing';
import * as faker from "faker";

describe('PrizeListComponent', () => {
 let component: PrizeListComponent;
 let fixture: ComponentFixture<PrizeListComponent>;
 let debug: DebugElement;

 beforeEach(waitForAsync(() => {
   TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
     declarations: [PrizeListComponent]
   })
     .compileComponents();
 }));

 beforeEach(() => {
  fixture = TestBed.createComponent(PrizeListComponent);
  component = fixture.componentInstance;
  component.prizeList = []
  for (let i = 0; i < 3; i++) {
    component.prizeList.push(
      new Prize(
        i,
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      )
    );
  }
  fixture.detectChanges();
  debug = fixture.debugElement;
});

it('should create', () => {
  expect(component).toBeTruthy();
});


it("Component has at least one prize", () => {
  fixture.detectChanges();
  expect(debug.query(By.css("tbody tr")).childNodes.length).toBeGreaterThan(0);
 });

});
