import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dermantin } from './entities/dermantin.entity';
import { DermantinsResolver } from './dermantin.resolver';
import { DermantinsService } from './dermantin.service';
import { DermantinsController } from './dermantin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dermantin])],
  providers: [DermantinsService, DermantinsResolver],
  controllers: [DermantinsController],
  exports: [DermantinsService],
})
export class DermantinsModule {}
