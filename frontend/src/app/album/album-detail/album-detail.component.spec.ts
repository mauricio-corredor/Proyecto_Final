import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Album } from 'src/models/album';
import { Collector } from 'src/models/collector';
import { CollectorAlbum } from 'src/models/collectorAlbum';
import { Comment } from 'src/models/comment';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { TrackCreateComponent } from '../track-create/track-create.component';

import { AlbumDetailComponent } from './album-detail.component';

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
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
      imports: [HttpClientModule, RouterTestingModule,
        FormsModule, ReactiveFormsModule, ToastNoAnimationModule.forRoot()],
      declarations: [ AlbumDetailComponent, TrackCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;

    let comments: Comment[] = [];
    for (let i = 0; i < 5; i++) {
      comments.push(new Comment(i, faker.lorem.paragraph(), Math.floor(Math.random() * 5) + 1));
    }

    component.album = new Album(1, faker.lorem.slug(), faker.image.cats(250, 230),
    faker.date.past(), faker.lorem.paragraph(),
    faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
    [new Performer(faker.datatype.number(), faker.name.findName(), faker.date.past(), faker.date.past())], comments);

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('calculate ratings average', () => {
    component.calculateRatingsAverage(component.album.comments.map(x=> x.rating));
    component.ratingsAverage = Math.floor(component.ratingsAverage);
    fixture.detectChanges();
    expect(debug.queryAll(By.css('.ratings-average')).length).toBe(component.ratingsAverage);
  });


  it('calculate ratings when 0 comments', () => {
    component.album.comments = [];
    component.calculateRatingsAverage(component.album.comments.map(x=> x.rating));
    fixture.detectChanges();
    expect(debug.queryAll(By.css('.ratings-average')).length).toBe(0);
  });

  it('opens collectors modal', () => {
    component.users = [
      new Collector(1,
        faker.name.firstName(),
        faker.datatype.number(),
        faker.internet.email(), [], [],
        [new CollectorAlbum(1, faker.datatype.number(), "Active",
        new Album(1, faker.name.findName(),
          faker.image.cats(), faker.date.past(), faker.lorem.text(),
          faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], []))])];
    component.getAlbumCollectors();
    component.selected = true;
    component.openCollectorsModal();
    fixture.detectChanges();
    expect(debug.query(By.css('.collector-card'))).toBeNull();
  })

  it('get users comments', () =>{
    component.getUsersNameForComments();
    fixture.detectChanges();
    expect(debug.query(By.css('.comments-card'))).toBeTruthy();
  })

  it('show track form', () => {
    component.showTrackForm();
    fixture.detectChanges();
    expect(debug.query(By.css('.track-form'))).toBeTruthy();
  })

  it('reload tracks', () => {
    component.reloadTracks();
    fixture.detectChanges();
    expect(debug.query(By.css('.album-detail'))).toBeNull();
  })
});
