/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoService } from './producto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Producto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
  });

  it('should ...', inject([ProductoService], (service: ProductoService) => {
    expect(service).toBeTruthy();
  }));
});
