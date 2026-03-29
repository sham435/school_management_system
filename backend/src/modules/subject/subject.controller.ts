import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.subjectService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.subjectService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }

  @Get('class/:classId')
  getByClass(@Param('classId') classId: string) {
    return this.subjectService.getByClass(classId);
  }
}
