import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdvertisementsService } from './advertisement.service';
import { Advertisement } from './entities/advertisement.entity';
import { CreateAdvertisementInput } from './input/create-advertisement.input';
import { UpdateAdvertisementInput } from './input/update-advertisement.input';

@ApiTags('Advertisements')
@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Post()
  @ApiOperation({ summary: 'Create advertisement' })
  @ApiResponse({ status: 201, type: Advertisement })
  create(@Body() input: CreateAdvertisementInput) {
    return this.advertisementsService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all advertisements' })
  @ApiResponse({ status: 200, type: [Advertisement] })
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get advertisement by ID' })
  @ApiResponse({ status: 200, type: Advertisement })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.advertisementsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update advertisement' })
  @ApiResponse({ status: 200, type: Advertisement })
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateAdvertisementInput) {
    return this.advertisementsService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete advertisement' })
  @ApiResponse({ status: 200, type: Advertisement })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.advertisementsService.remove(id);
  }
}
