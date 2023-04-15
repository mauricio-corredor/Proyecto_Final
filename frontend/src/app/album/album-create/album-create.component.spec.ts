import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastNoAnimationModule } from 'ngx-toastr';
import * as faker from 'faker';

import { AlbumCreateComponent } from './album-create.component';
import { event } from 'jquery';
import { Album } from 'src/models/album';
import { Genre } from 'src/models/genre.enum';
import { RecordLabel } from 'src/models/recordLabel.enum';

describe('AlbumCreateComponent', () => {
  let component: AlbumCreateComponent;
  let fixture: ComponentFixture<AlbumCreateComponent>;
  let debug: DebugElement;
  const genres: Genre[] = [
    Genre.Classical,
    Genre.Folk,
    Genre.Rock,
    Genre.Salsa
  ];
  const labels: RecordLabel[] = [
    RecordLabel.DiscosFuentes,
    RecordLabel.EMI,
    RecordLabel.Elektra,
    RecordLabel.FaniaRecords,
    RecordLabel.SonyMusic
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule,
        ToastNoAnimationModule.forRoot()],
      declarations: [ AlbumCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreateComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check image url', () => {
    component.url = faker.internet.url();
    expect(debug.query(By.css('.img-verification'))).toBeTruthy();

  })

  it('clear invalid url', () => {
    component.clearUrl(event);
    expect(debug.query(By.css('.album-cover-preview'))).toBeFalsy();
  })

  it('create album without artist', () => {
    component.createAlbum(new Album(1, faker.name.findName(),
    faker.image.cats(), faker.date.past(), faker.lorem.text(),
    faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], []))
    expect(debug.query(By.css('#toast-container'))).toBeNull()
  })
});
