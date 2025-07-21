import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './input/create-admin.input';
import { UpdateAdminInput } from './input/update-admin.input';
import { ChangeAdminPasswordInput } from './input/change-password.input';

@Injectable()
export class AdminsService {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}

  async create(input: CreateAdminInput): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const admin = this.adminRepo.create({ ...input, password: hashedPassword });
    return this.adminRepo.save(admin);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepo.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, input: UpdateAdminInput): Promise<Admin> {
    const admin = await this.findOne(id);
    if ('password' in input) {
      delete input.password;
    }
    Object.assign(admin, input);
    return this.adminRepo.save(admin);
  }

  async remove(id: number): Promise<Admin> {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);
    return admin;
  }

  async changePassword(id: number, input: ChangeAdminPasswordInput): Promise<string> {
    const admin = await this.findOne(id);
    const isValid = await bcrypt.compare(input.oldPassword, admin.password);
    if (!isValid) throw new BadRequestException('Old password is incorrect');
    if (input.newPassword !== input.confirmNewPassword) throw new BadRequestException('Passwords do not match');
    admin.password = await bcrypt.hash(input.newPassword, 10);
    await this.adminRepo.save(admin);
    return 'Password successfully updated';
  }
}
