import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get(':productId')
  async findOne(@Param('productId') productId: string){
    return await this.appService.findOne(productId)
  }
}
