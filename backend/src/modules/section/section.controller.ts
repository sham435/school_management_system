import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.sectionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.sectionService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }

  @Get('class/:classId')
  getByClass(@Param('classId') classId: string) {
    return this.sectionService.getByClass(classId);
  }
}
