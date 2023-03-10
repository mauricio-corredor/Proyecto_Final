/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Controller()
export class AppController {
  constructor(private readonly sqsService: SqsService) {}


  @Post('bodega')
  async enviaMensaje(@Body() body: any){
  
    const {idProducto, pais, cantidad} = body;
    
    try {
      await this.sqsService.send("ColaInventario", {
        id: 'msj1',
        body: { body },       
        messageAttributes: { },
        delaySeconds: 0,
      });
    } catch (error) {
      console.log(error)
        return {'message': 'error'};
    }
    return { 'message': 'Mensaje enviado a la cola'}
  }
}
