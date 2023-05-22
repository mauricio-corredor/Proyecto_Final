/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';

@Module({
  imports: [    
    TypeOrmModule.forFeature([AppEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'proyecto.cco378ibyevv.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'proyecto',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      dropSchema: false,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
