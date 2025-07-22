import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DermantinImagesService } from './dermantin-image.service';
import { DermantinImage } from './entities/dermantin-image.entity';
import { CreateDermantinImageInput } from './input/create-dermantin-image.input';
import { UpdateDermantinImageInput } from './input/update-dermantin-image.input';

@ApiTags('Dermantin Images')
@Controller('dermantin-images')
export class DermantinImagesController {
  constructor(private readonly dermantinImagesService: DermantinImagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create dermantin image' })
  @ApiResponse({ status: 201, type: DermantinImage })
  create(@Body() input: CreateDermantinImageInput) {
    return this.dermantinImagesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dermantin images' })
  @ApiResponse({ status: 200, type: [DermantinImage] })
  findAll() {
    return this.dermantinImagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dermantin image by ID' })
  @ApiResponse({ status: 200, type: DermantinImage })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dermantinImagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update dermantin image' })
  @ApiResponse({ status: 200, type: DermantinImage })
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateDermantinImageInput) {
    return this.dermantinImagesService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete dermantin image' })
  @ApiResponse({ status: 200, type: DermantinImage })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dermantinImagesService.remove(id);
  }
}
