import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { Album } from 'src/models/album';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { AlbumCreateComponent } from '../album-create/album-create.component';
import { AlbumDetailComponent } from '../album-detail/album-detail.component';

import { AlbumListComponent } from './album-list.component';

describe('AlbumsComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
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
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'albums/:id', component: AlbumDetailComponent }
        ]),
        ToastNoAnimationModule.forRoot()],
      declarations: [ AlbumListComponent, AlbumCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    component.albums = [];
    component.filteredAlbums = [];
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not display filtered-albums but no-album div, when array is empty', () => {
    expect(debug.query(By.css('.filtered-albums'))).toBeNull();
    expect(debug.query(By.css('.no-albums'))).toBeTruthy();
  });


  it('should display only albums by selected artist', () => {
    let fakeArtist = "Fake Artist";
    for (let i = 0; i < 3; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
      [new Performer(faker.datatype.number(),fakeArtist, faker.datatype.datetime(), faker.datatype.datetime())], []));
    }
    for (let i = 0; i < 5; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
      [new Performer(faker.datatype.number(),faker.name.firstName(), faker.datatype.datetime(), faker.datatype.datetime())], []));
    }
    for (let i = 0; i < 5; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []));
    }
    component.filterValues.artist = fakeArtist;
    component.filteredAlbums = component.performFilters();
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-albums')).children.length).toBe(3);
  });


  it('should display only albums by selected genre', () => {
    for (let i = 0; i < 5; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      Genre.Classical, faker.random.arrayElement(labels), [], [], []));
    }
    for (let i = 0; i < 5; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      Genre.Folk, faker.random.arrayElement(labels), [], [], []));
    }
    component.filterValues.genre = Genre.Classical;
    component.filteredAlbums = component.performFilters();
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-albums')).children.length).toBe(5);
  });


  it('should display only albums by selected record label', () => {
    for (let i = 0; i < 10; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), RecordLabel.DiscosFuentes, [], [], []));
    }
    for (let i = 0; i < 5; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), RecordLabel.SonyMusic, [], [], []));
    }
    component.filterValues.label = RecordLabel.DiscosFuentes;
    component.filteredAlbums = component.performFilters();
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-albums')).children.length).toBe(10);
  });


  it('should display all albums when no filter is applied', () => {
    for (let i = 0; i < 10; i++) {
      component.albums.push(new Album(i, faker.lorem.slug(), faker.image.cats(250, 230),
      faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [],
      [new Performer(faker.datatype.number(),faker.name.findName(), faker.datatype.datetime(), faker.datatype.datetime())], []));
    }
    component.filterValues.artist = '';
    component.filterValues.genre = '';
    component.filterValues.label = '';
    component.filteredAlbums = component.performFilters();

    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-albums')).children.length).toBe(10);
  });

  it('select album', () => {
    fixture.ngZone.run(() => {
      component.onSelected(101);
    });
    fixture.detectChanges();
    expect(debug.query(By.css('.container-fluid'))).toBeTruthy();
  })

  it('set filters', () => {
    component.genreFilter = faker.random.arrayElement(genres);
    component.labelFilter = faker.random.arrayElement(labels);
    component.artistFilter = "Queen";
    fixture.detectChanges();
    expect(debug.query(By.css('.filtered-albums'))).toBeNull();
  })

  it('show new album form', () => {
    component.showForm();
    fixture.detectChanges();
    expect(debug.query(By.css('.album-form'))).toBeTruthy();
  })

  it('hide new album form', () => {
    component.hideForm();
    fixture.detectChanges();
    expect(debug.query(By.css('.album-form'))).toBeNull();
  })
});
