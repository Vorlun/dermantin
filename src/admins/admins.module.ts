import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminsService } from './admins.service';
import { AdminController } from './admins.controller';
import { AdminResolver } from './admin.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminsService, AdminResolver],
})
export class AdminsModule {}
