/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorCreateComponent } from './collector-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CollectorCreateComponent', () => {
  let component: CollectorCreateComponent;
  let fixture: ComponentFixture<CollectorCreateComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorCreateComponent ],
      imports: [
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [ FormBuilder, ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component has a form with 4 elements/sections', () => {
    fixture.detectChanges();
    expect(debug.query(By.css("form")).children.length).toBe(4);
  })
});
