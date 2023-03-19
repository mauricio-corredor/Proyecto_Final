import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {AppDto} from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('inventario/:countryCode/:productId')
  findOne(@Param('countryCode') countryCode: string, @Param('productId') productId: string){
    return this.appService.findOne(countryCode, productId)
  }

  @Post('inventario')
  async post(@Body() body: AppDto) {
    return this.appService.postCache(body);
  }
}
