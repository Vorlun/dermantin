import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HistoriesService } from './histories.service';
import { History } from './entities/history.entity';
import { CreateHistoryInput } from './input/create-history.input';
import { UpdateHistoryinput } from './input/update-history.input';

@ApiTags('Histories')
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create history' })
  @ApiResponse({ status: 201, type: History })
  create(@Body() input: CreateHistoryInput) {
    return this.historiesService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all histories' })
  @ApiResponse({ status: 200, type: [History] })
  findAll() {
    return this.historiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get history by ID' })
  @ApiResponse({ status: 200, type: History })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update history' })
  @ApiResponse({ status: 200, type: History })
  update(@Param('id', ParseIntPipe) id: number, @Body() input: UpdateHistoryinput) {
    return this.historiesService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete history' })
  @ApiResponse({ status: 200, type: History })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historiesService.remove(id);
  }
}
