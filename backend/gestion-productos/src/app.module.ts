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
      host: process.env.db_postgres_host || 'localhost',
      port: 5432,
      username: process.env.db_postgres_user || 'postgres',
      password: process.env.db_postgres_password || 'postgres',
      database: process.env.db_postgres_db || 'postgres',
      entities: [AppEntity],
      dropSchema: false,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
