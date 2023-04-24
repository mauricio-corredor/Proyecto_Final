/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BodegaService } from './bodega.service';

describe('Service: Bodega', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BodegaService]
    });
  });

  it('should ...', inject([BodegaService], (service: BodegaService) => {
    expect(service).toBeTruthy();
  }));
});
