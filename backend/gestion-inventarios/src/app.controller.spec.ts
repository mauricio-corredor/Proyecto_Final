/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AppEntity } from './app.entity';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: 
      [
        {
          provide: AppService,
          useValue: {
            findAllProducts: jest.fn(),
            findByCountry: jest.fn(),
            getAllProductosInventario: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
         
      ],
      imports: [HttpModule],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });
  

  describe('findAllProducts', () => {
    it('should return an array of products with inventory details', async () => {
      const inventariosMock: AppEntity[] = [
        {
          id: '1',
          idProducto: '1',
          paisInventario: 'US',
          cantidadTotal: 10,
        },
        {
          id: '2',
          idProducto: '2',
          paisInventario: 'UK',
          cantidadTotal: 5,
        },
      ];

      const productosMock = {
        data: [
          {
            idProducto: '1',
            descripcionProducto: 'Producto 1',
            imagenProducto: 'imagen1.png',
            proveedor: 'Proveedor 1',
            fabricanteProducto: 'fabricante 1',
            volumenProducto: 'volumen 1',
            tipoProducto: 'tipo 1',
            fechaVencimiento: '01/01/2023',
            codigoProducto: 'C01',
            precioProducto: 10.50
          },
          {
            idProducto: '2',
            descripcionProducto: 'Producto 2',
            imagenProducto: 'imagen2.png',
            proveedor: 'Proveedor 2',
            fabricanteProducto: 'fabricante 2',
            volumenProducto: 'volumen 2',
            tipoProducto: 'tipo 2',
            fechaVencimiento: '02/02/2023',
            codigoProducto: 'C02',
            precioProducto: 20.50
          },
        ],
      };
      
      jest.spyOn(appService, 'getAllProductosInventario').mockResolvedValue(inventariosMock);
                              
      jest.spyOn(httpService, 'get').mockReturnValue(of(productosMock) as any);

      const result = await appController.findAllProducts();

      expect(result).toEqual(   [                                                                                                                                                    
        {
          id: '1',
          idProducto: '1',
          paisInventario: 'US',
          cantidadTotal: 10,
          descripcionProducto: 'Producto 1',
          imagenProducto: 'imagen1.png',
          proveedor: 'Proveedor 1',
          fabricanteProducto: 'fabricante 1',
          volumenProducto: 'volumen 1',
          tipoProducto: 'tipo 1',
          fechaVencimiento: '01/01/2023',
          codigoProducto: 'C01',
          precioProducto: 10.5
        },
        {
          id: '2',
          idProducto: '2',
          paisInventario: 'UK',
          cantidadTotal: 5,
          descripcionProducto: 'Producto 2',
          imagenProducto: 'imagen2.png',
          proveedor: 'Proveedor 2',
          fabricanteProducto: 'fabricante 2',
          volumenProducto: 'volumen 2',
          tipoProducto: 'tipo 2',
          fechaVencimiento: '02/02/2023',
          codigoProducto: 'C02',
          precioProducto: 20.5
        }
      ]);
    });
  });

  describe('findByCountry', () => {
    it('should return an array of products for the given country', async () => {
      const paisInventario = 'US';      
      const inventariosMock: AppEntity[] = [
        {
          id: '1',
          idProducto: '1',
          paisInventario: 'US',
          cantidadTotal: 10,
        },
        {
          id: '2',
          idProducto: '2',
          paisInventario: 'US',
          cantidadTotal: 5,
        },
      ];

      const findOneMock = jest.spyOn(appController, 'findOne').mockImplementation(async (pais, id) => {
        const producto = {
          idProducto: id,
          descripcionProducto: `Producto ${id}`,
          imagenProducto: `imagen${id}.png`,
          proveedor: `Proveedor ${id}`,
        };
        return Promise.resolve(producto);
      });
      jest.spyOn(appService, 'findByCountry').mockResolvedValue(inventariosMock);

      const result = await appController.findByCountry(paisInventario);
      
      expect(result).toEqual([
        {
          idProducto: '1',
          descripcionProducto: 'Producto 1',
          imagenProducto: 'imagen1.png',
          proveedor: 'Proveedor 1',
        },
        {
          idProducto: '2',
          descripcionProducto: 'Producto 2',
          imagenProducto: 'imagen2.png',
          proveedor: 'Proveedor 2',
        },
      ]);

      expect(findOneMock).toHaveBeenCalledTimes(2);
      expect(findOneMock).toHaveBeenNthCalledWith(1, 'US', '1');
      expect(findOneMock).toHaveBeenNthCalledWith(2, 'US', '2');
    });
});

describe('GET /health', () => {
    it('should return "OK"', async () => {
      const response = await appController.get();
      expect(response).toBe('ok');
    });
  });

});