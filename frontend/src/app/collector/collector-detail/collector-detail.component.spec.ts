/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as faker from "faker";

import { CollectorDetailComponent } from './collector-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Album } from 'src/models/album';
import { Genre } from 'src/models/genre.enum';
import { RecordLabel } from 'src/models/recordLabel.enum';

describe('CollectorDetailComponent', () => {
  let component: CollectorDetailComponent;
  let fixture: ComponentFixture<CollectorDetailComponent>;
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
      declarations: [ CollectorDetailComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDetailComponent);
    component = fixture.componentInstance;
    let cDetailDe = fixture.debugElement.query(By.css('.c-detail'));
    let cDetailEl = cDetailDe.nativeElement;

    let expectedCDetail = {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      telephone: faker.datatype.number(),
      favoritePerformers: [],
      comments: [],
      collectorAlbums: [
        {
          id: faker.datatype.number(),
          price: faker.datatype.number(),
          status: faker.lorem.word(),
          album: {
            id: faker.datatype.number(),
            name: faker.lorem.word(),
            cover: faker.lorem.word(),
            releaseDate: faker.date.past(),
            description: faker.lorem.word(),
            genre: faker.random.arrayElement(genres),
            recordLabel: faker.random.arrayElement(labels),
            tracks: [],
            performers: [],
            comments: []
          }
        }
      ]
    };
    component.collectorDetail = expectedCDetail;

    let expectedCAlbums = [];

    for (let i = 1; i <= 10; i++) {
      let album = {
        id: i,
        price: faker.datatype.number(),
        status: faker.lorem.word(),
        album: []
      };
      expectedCAlbums.push(album);
    }
    component.collectorAlbums = expectedCAlbums;

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component has no collector albums', () => {
    component.collectorDetail.collectorAlbums = [];
    component.collectorAlbums = [];
    fixture.detectChanges();
    expect(debug.query(By.css(".no-albums")).nativeElement.textContent.trim())
      .toBe("This collector doesn't have any albums for sale or exchange");
  });

  it('Component has 10 collector albums', () => {
    fixture.detectChanges();
    expect(debug.query(By.css("tbody")).children.length).toBe(10);
  })
});
