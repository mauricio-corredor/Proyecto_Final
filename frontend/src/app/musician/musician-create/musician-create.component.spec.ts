/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MusicianCreateComponent } from './musician-create.component';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { image } from 'faker';

describe('MusicianCreateComponent', () => {
  let component: MusicianCreateComponent;
  let fixture: ComponentFixture<MusicianCreateComponent>;
  let debug: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicianCreateComponent ],
      imports: [ ToastrModule.forRoot(),
         HttpClientTestingModule,
         RouterTestingModule,
         ReactiveFormsModule ],
      providers: [ FormBuilder, ToastrService ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });

  it('Component is instance of Forms', () => {
   fixture.detectChanges();
   expect(component.musicianForm).toBeInstanceOf(FormGroup);
  })


  it('musicianForm invalid when empty', () => {
    expect(component.musicianForm.valid).toBeFalsy();
  });

  it('name field validity', () => {

    let name = component.musicianForm.controls['name'];
    expect(name.valid).toBeFalsy();
    fixture.detectChanges();
    name.setValue("");
        expect(name.hasError('required')).toBeTruthy();
    fixture.detectChanges();

  });

  it('image field validity', () => {

    let image = component.musicianForm.controls['image'];
    expect(image.valid).toBeFalsy();
    fixture.detectChanges();
    image.setValue("");
        expect(image.hasError('required')).toBeTruthy();
    fixture.detectChanges();

  });
});
