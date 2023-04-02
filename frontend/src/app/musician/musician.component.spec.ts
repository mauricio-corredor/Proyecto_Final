import { MusicianComponent } from "./musician.component";
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import * as faker from "faker";
import { Performer } from '../../models/performer';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";


describe("MusicianComponent", () => {
 let component: MusicianComponent;
 let fixture: ComponentFixture<MusicianComponent>;
 let debug: DebugElement;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [MusicianComponent],
     imports: [HttpClientTestingModule],
   }).compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(MusicianComponent);
   component = fixture.componentInstance;
   component.musicianList = [
     new Performer( faker.datatype.number(), faker.lorem.word(),       faker.datatype.datetime(),       faker.datatype.datetime()        )
   ];
   fixture.detectChanges();
   debug = fixture.debugElement;
 });

 it("should create", () => {
   expect(component).toBeTruthy();
 });



});
