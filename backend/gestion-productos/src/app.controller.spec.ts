import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('App Controller', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    findAll: () => [
      {
        descripcionProducto: 'Pantene',
        imagenProducto:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.beautytocare.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2Fglobal%2Fimage%2F1300x1300%2F85e4522595efc69f496374d01ef2bf13%2Fp%2Fa%2Fpantene-pro-v-repair-protect-shampoo-675ml.jpg&tbnid=xSKGd4C2xh4E_M&vet=12ahUKEwjbmJL6nYz-AhXamoQIHb_5D54QMygGegUIARD_AQ..i&imgrefurl=https%3A%2F%2Fwww.caretobeauty.com%2Fco%2Fpantene-pro-v-repair-protect-shampoo-675ml%2F&docid=ZV3f2EnzAgvwfM&w=1300&h=1300&q=pantene&client=safari&ved=2ahUKEwjbmJL6nYz-AhXamoQIHb_5D54QMygGegUIARD_AQ',
        proveedor: 'D1',
        fabricanteProducto: 'P&F',
        volumenProducto: '100',
        tipoProducto: 'producto capilar',
        fechaVencimiento: new Date(),
        idProducto: '2fe52712-8166-435a-92d3-b0a00fd88068',
        codigoProducto: 'CP01',
        precioProducto: 20.50,
      },
      {
        descripcionProducto: 'Pepsi',
        imagenProducto:
          'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
        proveedor: 'D1',
        fabricanteProducto: 'Femsa',
        volumenProducto: '750',
        tipoProducto: 'gaseosa',
        fechaVencimiento: new Date(),
        idProducto: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
        codigoProducto: 'CP02',
        precioProducto: 8.50,
      },
    ],
  };

  const appServiceProvider = {
    provide: AppService,
    useValue: mockAppService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [appServiceProvider],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('findAll', async () => {
    expect(await appController.findAll()).toEqual(mockAppService.findAll());
  });

  it('findOne', async () => {
    expect(
      await appController.findOne('5753fcfa-215e-4b51-939e-ef5c783f1cb8'),
    ).toEqual(mockAppService.findAll()[1]);
  });
});
