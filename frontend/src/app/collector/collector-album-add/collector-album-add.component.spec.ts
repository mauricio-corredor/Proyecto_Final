/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as faker from "faker"

import { CollectorAlbumAddComponent } from './collector-album-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Collector } from 'src/models/collector';
import { Album } from 'src/models/album';
import { Genre } from 'src/models/genre.enum';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { RouterTestingModule } from '@angular/router/testing';

describe('CollectorAlbumAddComponent', () => {
  let component: CollectorAlbumAddComponent;
  let fixture: ComponentFixture<CollectorAlbumAddComponent>;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorAlbumAddComponent ],
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
    fixture = TestBed.createComponent(CollectorAlbumAddComponent);
    component = fixture.componentInstance;
    component.albums = [];
    component.collectors = [];
    for (let i = 0; i < 2; i++) {
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

    for (let i = 0; i < 3; i++) {
      component.albums.push(
        new Album(
          i,
          faker.lorem.slug(),
          faker.image.cats(250, 230),
          faker.date.past(),
          faker.lorem.paragraph(),
          faker.random.arrayElement(genres),
          faker.random.arrayElement(labels),
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

  it('Component has a form with 5 elements/sections', () => {
    fixture.detectChanges();
    expect(debug.query(By.css("form")).children.length).toBe(5);
  });

  it('Collector select field has 3 options', () => {
    fixture.detectChanges();
    expect(debug.query(By.css(".collector-select select")).children.length).toBe(3);
  });

  it('Album select field has 4 options', () => {
    fixture.detectChanges();
    expect(debug.query(By.css(".album-select select")).children.length).toBe(4);
  });

  it('Status select field has 3 options', () => {
    fixture.detectChanges();
    expect(debug.query(By.css(".status-select select")).children.length).toBe(3);
  });
});
