import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DermantinImage } from './entities/dermantin-image.entity';
import { CreateDermantinImageInput } from './input/create-dermantin-image.input';

@Injectable()
export class DermantinImagesService {
  constructor(
    @InjectRepository(DermantinImage) private imageRepo: Repository<DermantinImage>,
  ) {}

  create(input: CreateDermantinImageInput): Promise<DermantinImage> {
    const image = this.imageRepo.create(input);
    return this.imageRepo.save(image);
  }

  findAll(): Promise<DermantinImage[]> {
    return this.imageRepo.find({ relations: ['dermantin'] });
  }

  async findOne(id: number): Promise<DermantinImage> {
    const image = await this.imageRepo.findOne({
      where: { id },
      relations: ['dermantin'],
    });
    if (!image) throw new NotFoundException('Dermantin image not found');
    return image;
  }

  async update(id: number, input: Partial<CreateDermantinImageInput>): Promise<DermantinImage> {
    const image = await this.findOne(id);
    Object.assign(image, input);
    return this.imageRepo.save(image);
  }

  async remove(id: number): Promise<DermantinImage> {
    const image = await this.findOne(id);
    await this.imageRepo.remove(image);
    return image;
  }
}
