import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.examService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.examService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(id);
  }

  @Get('class/:classId')
  getByClass(@Param('classId') classId: string) {
    return this.examService.getExamByClass(classId);
  }
}
