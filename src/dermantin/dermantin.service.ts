import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dermantin } from './entities/dermantin.entity';
import { CreateDermantinInput } from './input/create-dermantin.input';

@Injectable()
export class DermantinsService {
  constructor(
    @InjectRepository(Dermantin) private dermantinRepo: Repository<Dermantin>,
  ) {}

  create(input: CreateDermantinInput): Promise<Dermantin> {
    const dermantin = this.dermantinRepo.create(input);
    return this.dermantinRepo.save(dermantin);
  }

  findAll(): Promise<Dermantin[]> {
    return this.dermantinRepo.find({
      relations: ['store', 'category', 'images', 'advertisements', 'reviews'],
    });
  }

  async findOne(id: number): Promise<Dermantin> {
    const dermantin = await this.dermantinRepo.findOne({
      where: { id },
      relations: ['store', 'category', 'images', 'advertisements', 'reviews'],
    });
    if (!dermantin) throw new NotFoundException('Dermantin not found');
    return dermantin;
  }

  async update(id: number, input: Partial<CreateDermantinInput>): Promise<Dermantin> {
    const dermantin = await this.findOne(id);
    Object.assign(dermantin, input);
    return this.dermantinRepo.save(dermantin);
  }

  async remove(id: number): Promise<Dermantin> {
    const dermantin = await this.findOne(id);
    await this.dermantinRepo.remove(dermantin);
    return dermantin;
  }
}
