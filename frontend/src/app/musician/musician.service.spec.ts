import { TestBed, getTestBed, inject, waitForAsync } from '@angular/core/testing';
import { MusicianService } from './musician.service';
import { Performer } from '../../models/performer';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";

import * as faker from "faker";
import { environment } from "../../environments/environment";
import { date } from 'faker';

describe("MusicianService", () => {
  let injector: TestBed;
  let service: MusicianService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "musicians";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicianService],
    });

    injector = getTestBed();
    service = injector.get(MusicianService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getMusicians() should return 1 records", () => {
    let mockPosts: Performer[] = [];


      let musician = new Performer(
        faker.datatype.number(),
        faker.image.image(),
        faker.datatype.datetime(),
        faker.datatype.datetime(),

      );
        mockPosts.push(musician);


    service.getMusicians().subscribe((musicianList) => {
      expect(musicianList.length).toBe(1);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockPosts);
  });
});
