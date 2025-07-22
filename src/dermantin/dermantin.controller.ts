import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DermantinsService } from './dermantin.service';
import { Dermantin } from './entities/dermantin.entity';
import { CreateDermantinInput } from './input/create-dermantin.input';
import { UpdateDermantinInput } from './input/update-dermantin.input';

@ApiTags('Dermantins')
@Controller('dermantins')
export class DermantinsController {
  constructor(private readonly dermantinsService: DermantinsService) {}

  @Post()
  @ApiOperation({ summary: 'Create dermantin' })
  @ApiResponse({ status: 201, type: Dermantin })
  create(@Body() input: CreateDermantinInput) {
    return this.dermantinsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dermantins' })
  @ApiResponse({ status: 200, type: [Dermantin] })
  findAll() {
    return this.dermantinsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dermantin by ID' })
  @ApiResponse({ status: 200, type: Dermantin })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dermantinsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update dermantin' })
  @ApiResponse({ status: 200, type: Dermantin })
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateDermantinInput) {
    return this.dermantinsService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dermantin' })
  @ApiResponse({ status: 200, type: Dermantin })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dermantinsService.remove(id);
  }
}
