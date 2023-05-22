/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdenService } from './orden.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Orden', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdenService]
    });
  });

  it('should ...', inject([OrdenService], (service: OrdenService) => {
    expect(service).toBeTruthy();
  }));
});
