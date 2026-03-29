import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';

@Controller('scholarship')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Get()
  findAll() {
    return this.scholarshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scholarshipService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.scholarshipService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.scholarshipService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scholarshipService.remove(id);
  }
}
