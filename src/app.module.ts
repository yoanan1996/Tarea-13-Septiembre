import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port:3306,
      username: 'root',
      password: 'lopez25',
      database: 'productoscrud',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
