import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { HistoriesResolver } from './histories.resolver';
import { User } from 'src/users/entities/user.entity';
import { Dermantin } from 'src/dermantin/entities/dermantin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, User, Dermantin])],
  controllers: [HistoriesController],
  providers: [HistoriesService, HistoriesResolver],
  exports: [HistoriesService],
})
export class HistoriesModule {}
