import { Body, Controller, Post } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { AppDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly sqsService: SqsService) {}

  @Post('bodega')
  async sendMessage(@Body() body: AppDto) {
    const data = {
      productId: body.productId,
      countryCode: body.countryCode,
      count: body.count,
    };
    const key = `${body.countryCode}_${body.countryCode}`;

    try {
      await this.sqsService.send(process.env.queue_name, {
        id: key,
        body: { data },
        messageAttributes: {},
        delaySeconds: 0,
      });
    } catch (er) {
      console.log(er);
      return { message: 'error, dont send message' };
    }
    return { message: 'Message send to queue' };
  }
}
