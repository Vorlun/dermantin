import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { CreateAdminInput } from './input/create-admin.input';
import { UpdateAdminInput } from './input/update-admin.input';
import { ChangePasswordInput } from './input/change-password.input';
import { find } from 'rxjs';

@Injectable()
export class AdminsService {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>){}
  async create(createAdminInput: CreateAdminInput): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminInput.password, 10)
    const admin = this.adminRepo.create({
      ...createAdminInput,
      password: hashedPassword
    })
    return this.adminRepo.save(admin)
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepo.find()
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({where:{id}})
    if(!admin) throw new NotFoundException("Admin not found")
    return admin
  }

  async update(id: number, updateAdminInput: UpdateAdminInput): Promise<Admin> {
    const admin = await this.findOne(id);

    if ('password' in updateAdminInput) {
      delete updateAdminInput.password;
    }

    Object.assign(admin, updateAdminInput);
    return this.adminRepo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id)
    await this.adminRepo.remove(admin)
    return admin;
  }

  async changePassword(id:number, input:ChangePasswordInput):Promise<string>{
    const admin = await this.findOne(id)

    const isPasswordValid = await bcrypt.compare(input.oldPassword, admin.password)
    if(!isPasswordValid) throw new BadRequestException("Old password is incorrect")

    if(input.newPassword !== input.confirmNewPassword) throw new BadRequestException("New password do not match")

    admin.password = await bcrypt.hash(input.newPassword, 10)
    await this.adminRepo.save(admin)

    return "Password Successfully updated"
  }
}
