import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('inventario/:countryCode/:productId')
  findOne(@Param('countryCode') countryCode: string, @Param('productId') productId: string){
    return this.appService.findOne(countryCode, productId)
  }
}
