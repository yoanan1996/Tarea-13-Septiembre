import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { Productos } from './producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productos])],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService], 
})
export class ProductosModule {}
