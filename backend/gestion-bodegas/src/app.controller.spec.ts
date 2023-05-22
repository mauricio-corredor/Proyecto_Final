/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('App Controller', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bodega', async () => {
      const result = [
        {
          idBodega: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
          nombreBodega: 'Bodega1',
          ubicacionPais: 'Colombia',
          ubicacionCiudad: 'Bogotá',
          zonaLocalizacion: 'Centro',
          capacidadVolumen: 750,
          capacidadUsada: 600,
          CapacidadDisponible: 150,
        },
        {
          idBodega: '2fe52712-8166-435a-92d3-b0a00fd88068',
          nombreBodega: 'Bodega2',
          ubicacionPais: 'Perú',
          ubicacionCiudad: 'Lima',
          zonaLocalizacion: 'Norte',
          capacidadVolumen: 100,
          capacidadUsada: 80,
          CapacidadDisponible: 20,
        },
      ];

      jest.spyOn(appService, 'findAll').mockResolvedValue(result);
      expect(await appController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a bodega by id', async () => {
      const idBodega = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';
      const result = {
          idBodega,
          nombreBodega: 'Bodega1',
          ubicacionPais: 'Colombia',
          ubicacionCiudad: 'Bogotá',
          zonaLocalizacion: 'Centro',
          capacidadVolumen: 750,
          capacidadUsada: 600,
          CapacidadDisponible: 150,
      };

      jest.spyOn(appService, 'findOne').mockResolvedValue(result);
      expect(await appController.findOne(idBodega)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new bodega', async () => {
      const bodega = {
        nombreBodega: 'Bodega1',
        ubicacionPais: 'Colombia',
        ubicacionCiudad: 'Bogotá',
        zonaLocalizacion: 'Centro',
        capacidadVolumen: 750,
        capacidadUsada: 600,
        CapacidadDisponible: 150,
      };
      const result = {
        idBodega: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
        ...bodega,
      };

      jest.spyOn(appService, 'create').mockResolvedValue(result);
      expect(await appController.create(bodega)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a bodega by id', async () => {
      const idBodega = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';
      const bodega = {
        nombreBodega: 'Bodega1',
        ubicacionPais: 'Colombia',
        ubicacionCiudad: 'Bogotá',
        zonaLocalizacion: 'Centro',
        capacidadVolumen: 750,
        capacidadUsada: 600,
        CapacidadDisponible: 150,
      };
      const result = {
        idBodega,
        ...bodega,
      };

      jest.spyOn(appService, 'update').mockResolvedValue(result);
      expect(await appController.update(idBodega, bodega)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should remove a bodega by id', async () => {
      const idBodega = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';

      jest.spyOn(appService, 'delete').mockResolvedValue();
      await appController.delete(idBodega);
      expect(appService.delete).toHaveBeenCalledWith(idBodega);
    });
  });

  describe('GET /health', () => {
    it('should return "RPTA OK"', async () => {
      const response = await appController.get();
      expect(response).toBe('RPTA OK');
    });
  });
});
