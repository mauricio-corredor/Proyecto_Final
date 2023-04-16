import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { Bodega } from 'src/models/bodega';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { Track } from 'src/models/track';

import { BodegaService } from './bodega.service';


describe('BodegaService', () => {
  let service: BodegaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BodegaService]
    });
    service = TestBed.inject(BodegaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all bodegas from the API via GET', () => {
    const mockBodegas: Bodega[] = [
      new Bodega('1', 'Bodega 1', 'imagen1.jpg', 'Proveedor 1', 'Fabricante 1', '100ml', 'Frutas', '2023-12-31'),
      new Bodega('2', 'Bodega 2', 'imagen2.jpg', 'Proveedor 2', 'Fabricante 2', '200ml', 'Perecederos', '2024-12-31')
    ];

    service.getBodegas().subscribe(bodegas => {
      expect(bodegas.length).toBe(2);
      expect(bodegas).toEqual(mockBodegas);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockBodegas);
  });

  it('should retrieve a single bodega from the API via GET', () => {
    const mockBodega: Bodega = new Bodega('1', 'Bodega 1', 'imagen1.jpg', 'Proveedor 1', 'Fabricante 1', '100ml', 'Frutas', '2023-12-31');

    service.getBodegaById('1').subscribe(bodega => {
      expect(bodega).toEqual(mockBodega);
    });

    const req = httpTestingController.expectOne(service['apiUrl'] + '1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBodega);
  });

  it('should add a new bodega to the API via POST', () => {
    const mockBodega: Bodega = new Bodega('1', 'Bodega 1', 'imagen1.jpg', 'Proveedor 1', 'Fabricante 1', '100ml', 'Frutas', '2023-12-31');

    service.addBodega(mockBodega).subscribe(bodega => {
      expect(bodega).toEqual(mockBodega);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBodega);
    req.flush(mockBodega);
  });
});

