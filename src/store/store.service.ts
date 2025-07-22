import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './input/create-store.input';

@Injectable()
export class StoresService {
  constructor(@InjectRepository(Store) private storeRepo: Repository<Store>) {}

  create(input: CreateStoreInput): Promise<Store> {
    const store = this.storeRepo.create(input);
    return this.storeRepo.save(store);
  }

  findAll(): Promise<Store[]> {
    return this.storeRepo.find({ relations: ['dermantins'] });
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepo.findOne({
      where: { id },
      relations: ['dermantins'],
    });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async update(id: number, input: Partial<CreateStoreInput>): Promise<Store> {
    const store = await this.findOne(id);
    Object.assign(store, input);
    return this.storeRepo.save(store);
  }

  async remove(id: number): Promise<Store> {
    const store = await this.findOne(id);
    await this.storeRepo.remove(store);
    return store;
  }
}
