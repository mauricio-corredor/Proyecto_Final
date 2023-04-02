import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { Producto } from 'src/models/producto';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { Track } from 'src/models/track';

import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let injector: TestBed;
  let service: ProductoService;
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
      providers: [ProductoService]
    });
    injector = getTestBed();
    service = TestBed.inject(ProductoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', inject([ProductoService], (service: ProductoService) => {
    expect(service).toBeTruthy();
  }));


  it('getProductos() should return 10 albums', () => {
    let mockProductos: Producto[] = [];
    for (let i = 0; i < 10; i++) {
      let album = new Producto(i, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []);
      mockProductos.push(album);
    }
    service.getProductos().subscribe((albums) => {
      expect(albums.length).toBe(10);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });


  it('getProductoById() should return album with id 24', () => {
    let album = new Producto(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
    faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []);

    service.getProductoById(24).subscribe((album) => {
      expect(album.id).toBe(24);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(album);
  });

  it('add album', () => {
    service.addProducto(new Producto(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
    faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], [])).subscribe((a) => {
      expect(a.id).toBe(24);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
  })

  it('add musician to album', () => {
    let name = faker.name.findName()
    service.addArtistToProducto(
      new Producto(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
      faker.random.arrayElement(genres), faker.random.arrayElement(labels), [], [], []),
      new Performer(1, name, faker.date.past(), null)).subscribe((a) => {
        expect(a.performers[0].name).toBe(name);
    })
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
  })

  it('add band to album', () => {
    let name = faker.name.findName()
    service.addArtistToProducto(
      new Producto(24, faker.lorem.slug(), faker.image.cats(250, 230), faker.date.past(), faker.lorem.paragraph(),
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
