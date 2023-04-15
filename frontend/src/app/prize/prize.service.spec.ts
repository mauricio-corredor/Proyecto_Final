/* tslint:disable:no-unused-variable */
import { TestBed, getTestBed, inject, waitForAsync } from '@angular/core/testing';
import { PrizeService } from './prize.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Prize } from '../../models/prize';
import * as faker from "faker";

describe('Service: Prize', () => {
 let injector: TestBed;
 let service: PrizeService;
 let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrizeService]
    });
    injector = getTestBed();
    service = injector.get(PrizeService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should create service', inject([PrizeService], (service: PrizeService) => {
    expect(service).toBeTruthy();
  }));

  it('getPrize() should return more than records', () => {

    let mockPosts: Prize[] = [];

    for (let i = 1; i < 11; i++) {
      let prize = new Prize(i, faker.lorem.word(), faker.lorem.sentence(), faker.lorem.sentence());
      mockPosts.push(prize);
    }

    service.getPrizes().subscribe((prizes) => {
      expect(prizes.length).toBeGreaterThan(9);
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  afterEach(() => {
    httpMock.verify();
  });

});

