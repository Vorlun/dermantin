import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DermantinImage } from './entities/dermantin-image.entity';
import { DermantinImagesResolver } from './dermantin-image.resolver';
import { DermantinImagesService } from './dermantin-image.service';
import { DermantinImagesController } from './dermantin-image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DermantinImage])],
  providers: [DermantinImagesService, DermantinImagesResolver],
  controllers: [DermantinImagesController],
  exports: [DermantinImagesService],
})
export class DermantinImagesModule {}
