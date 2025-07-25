import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserInput } from './input/create-user.input';
import { UpdateUserInput } from './input/update-user.input';
import { ChangeUserPasswordInput } from './input/change-password.input';
import { ForgotPasswordInput } from './input/forget-password.input';
import { ResetPasswordInput } from './input/reset-password.input';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  create(@Body() input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateUserInput) {
    return this.usersService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: User })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email' })
  verifyEmail(@Query('token') token: string) {
    return this.usersService.verifyEmail(token);
  }

  @Post(':id/change-password')
  @ApiOperation({ summary: 'Change user password' })
  changePassword(@Param('id', ParseIntPipe) id: number, @Body() input: ChangeUserPasswordInput) {
    return this.usersService.changePassword(id, input);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send OTP for reset' })
  forgotPassword(@Body() input: ForgotPasswordInput) {
    return this.usersService.forgotPassword(input);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password via OTP' })
  resetPassword(@Body() input: ResetPasswordInput) {
    return this.usersService.resetPassword(input);
  }
}
