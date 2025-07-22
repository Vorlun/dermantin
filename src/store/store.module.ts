import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresResolver } from './store.resolver';
import { StoresController } from './store.controller';
import { StoresService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoresService, StoresResolver],
  controllers: [StoresController],
  exports: [StoresService],
})
export class StoresModule {}
