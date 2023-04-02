/* tslint:disable:no-unused-variable */
/* tslint:disable:no-unused-variable */
import { TestBed, getTestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PrizeCreateComponent } from './prize-create.component';
import { Prize } from 'src/models/prize';
import { HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PrizeListComponent } from '../prize-list/prize-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { stringify } from '@angular/compiler/src/util';





describe('PrizeCreateComponent', () => {
 let component: PrizeCreateComponent;
 let fixture: ComponentFixture<PrizeCreateComponent>;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientModule,
       HttpClientTestingModule,
       RouterTestingModule,
       ToastrModule.forRoot()
     ],
     declarations: [PrizeCreateComponent, PrizeListComponent],
     providers: [ FormBuilder, ToastrService ]
   })

     .compileComponents();
 }));

 beforeEach(() => {
   fixture = TestBed.createComponent(PrizeCreateComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });

 it('should be a form', () => {

  expect(component.prizeForm).toBeInstanceOf(FormGroup);
});

it('prizeForm invalid when empty', () => {
  expect(component.prizeForm.valid).toBeFalsy();
});

it('name field validity', () => {

  let name = component.prizeForm.controls['name'];
  expect(name.valid).toBeFalsy();
  fixture.detectChanges();
  name.setValue("");
      expect(name.hasError('required')).toBeTruthy();
  fixture.detectChanges();

});

it('description field validity', () => {

  let description = component.prizeForm.controls['description'];
  expect(description.valid).toBeFalsy();
  fixture.detectChanges();
  description.setValue("");
      expect(description.hasError('required')).toBeTruthy();
  fixture.detectChanges();

});


});
