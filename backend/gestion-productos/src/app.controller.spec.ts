/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    it('should return an array of products', async () => {
      const result = [
        {
          idProducto: '2fe52712-8166-435a-92d3-b0a00fd88068',
          descripcionProducto: 'Pantene',
          imagenProducto:
            'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.beautytocare.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Fglobal%2Fimage%2F1300x1300%2F85e4522595efc69f496374d01ef2bf13%2Fp%2Fa%2Fpantene-pro-v-repair-protect-shampoo-675ml.jpg&tbnid=xSKGd4C2xh4E_M&vet=12ahUKEwjbmJL6nYz-AhXamoQIHb_5D54QMygGegUIARD_AQ..i&imgrefurl=https%3A%2F%2Fwww.caretobeauty.com%2Fco%2Fpantene-pro-v-repair-protect-shampoo-675ml%2F&docid=ZV3f2EnzAgvwfM&w=1300&h=1300&q=pantene&client=safari&ved=2ahUKEwjbmJL6nYz-AhXamoQIHb_5D54QMygGegUIARD_AQ',
          proveedor: 'D1',
          fabricanteProducto: 'P&F',
          volumenProducto: '100',
          tipoProducto: 'producto capilar',
          fechaVencimiento: new Date().toString(),          
          codigoProducto: 'CP01',
          precioProducto: 20.5,
        },
        {
          idProducto: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
          descripcionProducto: 'Pepsi',
          imagenProducto:
            'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
          proveedor: 'D1',
          fabricanteProducto: 'Femsa',
          volumenProducto: '750',
          tipoProducto: 'gaseosa',
          fechaVencimiento: new Date().toString(),          
          codigoProducto: 'CP02',
          precioProducto: 8.5,
        },
      ];

      jest.spyOn(appService, 'findAll').mockResolvedValue(result);
      expect(await appController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const idProducto = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';
      const result = {
          idProducto,
          descripcionProducto: 'Pepsi',
          imagenProducto:
            'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
          proveedor: 'D1',
          fabricanteProducto: 'Femsa',
          volumenProducto: '750',
          tipoProducto: 'gaseosa',
          fechaVencimiento: new Date().toString(),          
          codigoProducto: 'CP02',
          precioProducto: 8.5,
      };

      jest.spyOn(appService, 'findOne').mockResolvedValue(result);
      expect(await appController.findOne(idProducto)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = {
        descripcionProducto: 'Pepsi',
        imagenProducto:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
        proveedor: 'D1',
        fabricanteProducto: 'Femsa',
        volumenProducto: '750',
        tipoProducto: 'gaseosa',
        fechaVencimiento: new Date().toString(),          
        codigoProducto: 'CP02',
        precioProducto: 8.5,
      };
      const result = {
        idProducto: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
        ...product,
      };

      jest.spyOn(appService, 'create').mockResolvedValue(result);
      expect(await appController.create(product)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a product by id', async () => {
      const idProducto = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';
      const product = {
        descripcionProducto: 'Pepsi',
        imagenProducto:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
        proveedor: 'D1',
        fabricanteProducto: 'Femsa',
        volumenProducto: '750',
        tipoProducto: 'gaseosa',
        fechaVencimiento: new Date().toString(),          
        codigoProducto: 'CP02',
        precioProducto: 8.5,
      };
      const result = {
        idProducto,
        ...product,
      };

      jest.spyOn(appService, 'update').mockResolvedValue(result);
      expect(await appController.update(idProducto, product)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should remove a product by id', async () => {
      const idProducto = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';

      jest.spyOn(appService, 'delete').mockResolvedValue();
      await appController.delete(idProducto);
      expect(appService.delete).toHaveBeenCalledWith(idProducto);
    });
  });

  describe('GET /health', () => {
    it('should return "OK"', async () => {
      const response = await appController.get();
      expect(response).toBe('OK');
    });
  });
});
