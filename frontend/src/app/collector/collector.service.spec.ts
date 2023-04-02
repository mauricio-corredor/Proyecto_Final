import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";

import * as faker from "faker";

import { CollectorService } from './collector.service';
import { Collector } from '../../models/collector'
import { environment } from "../../environments/environment";
import { CollectorAlbum } from 'src/models/collectorAlbum';
import { Genre } from 'src/models/genre.enum';
import { RecordLabel } from 'src/models/recordLabel.enum';

describe('Service: Collector', () => {
  let injector: TestBed;
  let service: CollectorService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "collectors/";
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
      providers: [CollectorService]
    });

    injector = getTestBed();
    service = injector.get(CollectorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', inject([CollectorService], (service: CollectorService) => {
    expect(service).toBeTruthy();
  }));

  it("getCollectors() should return 10 records", () => {
    let mockCollectors: Collector[] = [];

    for (let i = 1; i <= 10; i++) {
      let collector = new Collector(
        i,
        faker.name.findName(),
        faker.datatype.number(2),
        faker.internet.email(),
        [],
        [],
        []
      );
      mockCollectors.push(collector);
    }

    service.getCollectors().subscribe((collectors) => {
      expect(collectors.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockCollectors);
  });

  it("getCollector() should return 1 valid record", () => {
    let mockCollector = new Collector(
        1,
        faker.name.findName(),
        faker.datatype.number(2),
        faker.internet.email(),
        [],
        [],
        []
      );

    service.getCollector(1).subscribe((collector) => {
      expect(collector.name).toBeDefined();
    });

    const req = httpMock.expectOne(apiUrl + '1');
    expect(req.request.method).toBe("GET");
    req.flush(mockCollector);
  });

  it("getCollectorAlbums() should return 10 records", () => {
    let mockCollectorAlbums: CollectorAlbum[] = [];

    for (let i = 1; i <= 10; i++) {
      let collectorAlbum = new CollectorAlbum(
        i,
        faker.datatype.number(),
        faker.lorem.word(),
        {
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
        },
      );
      mockCollectorAlbums.push(collectorAlbum);
    }

    service.getCollectorAlbums(1).subscribe((collectors) => {
      expect(collectors.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl + '1/albums');
    expect(req.request.method).toBe("GET");
    req.flush(mockCollectorAlbums);
  });

  it("createCollector() should return the created record", () => {
    let mockCollector = new Collector(
      1,
      faker.name.findName(),
      faker.datatype.number(2),
      faker.internet.email(),
      [],
      [],
      []
    );

    service.createCollector(mockCollector).subscribe((collector) => {
      expect(collector.name).toBeDefined();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("POST");
    req.flush(mockCollector);
  });

  it("createCollectorAlbum() should return the created record", () => {
    let mockData = {
      'collector': faker.datatype.number(2),
      'album': faker.datatype.number(2),
      'price': faker.datatype.number(2),
      'status': faker.random.arrayElement(['Active', 'Inactive'])
    };

    service.createCollectorAlbum(mockData).subscribe((ca) => {
      expect(ca.price).toBeDefined();
    });

    const req = httpMock.expectOne(apiUrl + mockData.collector + '/albums/' + mockData.album);
    expect(req.request.method).toBe("POST");
    req.flush(mockData);
  });
});
