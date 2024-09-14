import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductDto } from './dto/create-producto.dto';
import { Productos } from './producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll(): Promise<Productos[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Productos> {
    return this.productosService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Productos> {
    return this.productosService.create(createProductDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto): Promise<Productos> {
    return this.productosService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productosService.remove(id);
  }
}
