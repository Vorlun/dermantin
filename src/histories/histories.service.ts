import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { CreateHistoryInput } from './input/create-history.input';
import { User } from 'src/users/entities/user.entity';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';
import { UpdateHistoryinput } from './input/update-history.input';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History) private readonly historyRepo: Repository<History>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Dermantin) private readonly dermantinRepo: Repository<Dermantin>,
  ) {}

async create(createHistoryInput: CreateHistoryInput) {
    const { userId, dermantinId } = createHistoryInput;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const dermantin = await this.dermantinRepo.findOne({ where: { id: dermantinId } });
    if (!dermantin) throw new NotFoundException('Dermantin not found');

    const history = this.historyRepo.create({
        user,
        dermantin,
    });

    return this.historyRepo.save(history);
}

  findAll(): Promise<History[]> {
    return this.historyRepo.find({ relations: ['user', 'dermantin'] });
  }

  async findOne(id: number): Promise<History> {
    const history = await this.historyRepo.findOne({ where: { id }, relations: ['user', 'dermantin'] });
    if (!history) throw new NotFoundException('History not found');
    return history;
  }

  async update(id: number, input: UpdateHistoryinput): Promise<History> {
    const history = await this.findOne(id);
    if (input.userId) {
      history.user = await this.userRepo.findOneByOrFail({ id: input.userId });
    }
    if (input.dermantinId) {
      history.dermantin = await this.dermantinRepo.findOneByOrFail({ id: input.dermantinId });
    }
    return this.historyRepo.save(history);
  }

  async remove(id: number): Promise<History> {
    const history = await this.findOne(id);
    await this.historyRepo.remove(history);
    return history;
  }
}