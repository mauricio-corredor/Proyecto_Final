import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Track } from 'src/models/track';
import * as faker from 'faker';

import { TrackCreateComponent } from './track-create.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TrackCreateComponent', () => {
  let component: TrackCreateComponent;
  let fixture: ComponentFixture<TrackCreateComponent>;
  let debug: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule,
        FormsModule, ReactiveFormsModule, ToastNoAnimationModule.forRoot()],
      declarations: [ TrackCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('attempt to create track with existing name', () => {
    let trackName = faker.name.findName();
    component.tracks = [new Track(trackName, faker.datatype.string())];
    component.createTrack(new Track(trackName, faker.datatype.string()));
    expect(debug.query(By.css('.container-fluid'))).toBeNull()
  })
});
