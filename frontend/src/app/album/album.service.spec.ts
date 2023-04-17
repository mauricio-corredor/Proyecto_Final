import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { Album } from 'src/models/album';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { Track } from 'src/models/track';

import { AlbumService } from './album.service';

describe('AlbumService', () => {
  let injector: TestBed;
  let service: AlbumService;
  let httpMock: HttpTestingController;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });
    injector = getTestBed();
    service = TestBed.inject(AlbumService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', inject([AlbumService], (service: AlbumService) => {
    expect(service).toBeTruthy();
  }));


  it('getAlbums() should return 10 albums', () => {
    let mockAlbums: Album[] = [];
    for (let i = 0; i < 10; i++) {
      let album = new Album(i, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []);
      mockAlbums.push(album);
    }
    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(10);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlbums);
  });


  it('getAlbumById() should return album with id 24', () => {
    let album = new Album(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
    faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []);

    service.getAlbumById(24).subscribe((album) => {
      expect(album.id).toBe(24);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(album);
  });

  it('add album', () => {
    service.addAlbum(new Album(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
    faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], [])).subscribe((a) => {
      expect(a.id).toBe(24);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
  })

  it('add musician to album', () => {
    let name = faker.name.findName()
    service.addArtistToAlbum(
      new Album(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []),
      new Performer(1, name, faker.date.past(), null)).subscribe((a) => {
        expect(a.performers[0].name).toBe(name);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
  })

  it('add band to album', () => {
    let name = faker.name.findName()
    service.addArtistToAlbum(
      new Album(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []),
      new Performer(1, name, null, faker.date.past())).subscribe((a) => {
        expect(a.performers[0].name).toBe(name);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
  })

  it('add track to album', () => {
    service.addTrack(new Track(faker.name.firstName(), faker.datatype.string()), 24).subscribe((t) => {
      expect(t).toBeTruthy();
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
  })
});
