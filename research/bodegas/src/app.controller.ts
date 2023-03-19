import { Body, Controller, Post } from '@nestjs/common';
import { AppDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('bodega')
  async post(@Body() body: AppDto) {
    return this.appService.sendMessage(body);
  }
}
