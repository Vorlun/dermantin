import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminInput } from './input/create-admin.input';
import { UpdateAdminInput } from './input/update-admin.input';
import { ChangePasswordInput } from './input/change-password.input';
import { AdminsService } from './admins.service';

@ApiTags('Admin')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminsService) {}

  @Post()
  create(@Body() createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminInput: UpdateAdminInput,
  ) {
    return this.adminService.update(id, updateAdminInput);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

  @Post(':id/change-password')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordInput: ChangePasswordInput,
  ) {
    return this.adminService.changePassword(id, changePasswordInput);
  }
}
