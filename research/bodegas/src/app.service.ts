import { Injectable, Logger } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { AppDto } from './app.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: AppDto): Promise<any> {
    const data = {
      productId: body.productId,
      countryCode: body.countryCode,
      count: body.count,
    };
    const key = `${body.countryCode}_${body.productId}`;
    try {
      await this.sqsService.send(process.env.queue_name, {
        id: key,
        body: data,
        messageAttributes: {},
        delaySeconds: 0,
      });
      this.logger.log(`sendMessage id: ${key}`);
      this.logger.log(`sendMessage body: ${JSON.stringify(data)}`);
      return { message: 'Message send to queue' };
    } catch (er) {
      this.logger.log(er);
      this.logger.log(`sendNotMessage id: ${key}`);
      return { message: 'error, dont send message' };
    }
  }
}
