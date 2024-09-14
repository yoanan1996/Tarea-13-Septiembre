import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './producto.entity'; 
import { CreateProductDto } from './dto/create-producto.dto'; 

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Productos)
    private readonly productosRepository: Repository<Productos>, 
  ) {}

  async findAll(): Promise<Productos[]> {
    return this.productosRepository.find();
  }

  async findOne(id: string): Promise<Productos> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async create(createProductDto: CreateProductDto): Promise<Productos> {
    const { nombre } = createProductDto;

   
    const existingProducto = await this.productosRepository.findOneBy({ nombre });
    if (existingProducto) {
      throw new BadRequestException(`Ya existe un producto con el nombre ${nombre}`);
    }

    const newProducto = this.productosRepository.create(createProductDto);
    return this.productosRepository.save(newProducto);
  }

  async update(id: string, updateProductDto: CreateProductDto): Promise<Productos> {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductDto);
    return this.productosRepository.save(producto);
  }

  async remove(id: string): Promise<void> {
    const producto = await this.findOne(id);
    await this.productosRepository.remove(producto);
  }
}
