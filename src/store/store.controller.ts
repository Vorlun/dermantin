import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StoresService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './input/create-store.input';
import { UpdateStoreInput } from './input/update-store.input';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiOperation({ summary: 'Create store' })
  @ApiResponse({ status: 201, type: Store })
  create(@Body() input: CreateStoreInput) {
    return this.storesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiResponse({ status: 200, type: [Store] })
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get store by ID' })
  @ApiResponse({ status: 200, type: Store })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update store' })
  @ApiResponse({ status: 200, type: Store })
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateStoreInput) {
    return this.storesService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete store' })
  @ApiResponse({ status: 200, type: Store })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.remove(id);
  }
}
