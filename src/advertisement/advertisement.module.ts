import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './entities/advertisement.entity';
import { AdvertisementsController } from './advertisement.controller';
import { AdvertisementsService } from './advertisement.service';
import { AdvertisementsResolver } from './advertisement.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement])],
  providers: [AdvertisementsService, AdvertisementsResolver],
  controllers: [AdvertisementsController],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule {}
