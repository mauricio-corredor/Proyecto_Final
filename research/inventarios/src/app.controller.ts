import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get(':countryCode/:productId')
  async findOne(@Param('countryCode') countryCode: string, @Param('productId') productId: string){
    return await this.appService.findOne(countryCode, productId)
  }
}
