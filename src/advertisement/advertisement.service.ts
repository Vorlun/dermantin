import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { CreateAdvertisementInput } from './input/create-advertisement.input';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement) private adRepo: Repository<Advertisement>,
  ) {}

  create(input: CreateAdvertisementInput): Promise<Advertisement> {
    const ad = this.adRepo.create(input);
    return this.adRepo.save(ad);
  }

  findAll(): Promise<Advertisement[]> {
    return this.adRepo.find({ relations: ['dermantin'] });
  }

  async findOne(id: number): Promise<Advertisement> {
    const ad = await this.adRepo.findOne({
      where: { id },
      relations: ['dermantin'],
    });
    if (!ad) throw new NotFoundException('Advertisement not found');
    return ad;
  }

  async update(id: number, input: Partial<CreateAdvertisementInput>): Promise<Advertisement> {
    const ad = await this.findOne(id);
    Object.assign(ad, input);
    return this.adRepo.save(ad);
  }

  async remove(id: number): Promise<Advertisement> {
    const ad = await this.findOne(id);
    await this.adRepo.remove(ad);
    return ad;
  }
}
