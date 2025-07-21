import { Controller, Get, Post, Param, Body, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './input/create-admin.input';
import { UpdateAdminInput } from './input/update-admin.input';
import { ChangeAdminPasswordInput } from './input/change-password.input';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({ status: 201, type: Admin })
  create(@Body() input: CreateAdminInput) {
    return this.adminService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin' })
  @ApiResponse({ status: 200, type: Admin })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateAdminInput,
  ) {
    return this.adminService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin' })
  @ApiResponse({ status: 200, type: Admin })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }

  @Post(':id/change-password')
  @ApiOperation({ summary: 'Change admin password' })
  @ApiResponse({ status: 200, type: String })
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: ChangeAdminPasswordInput,
  ) {
    return this.adminService.changePassword(id, input);
  }
}
