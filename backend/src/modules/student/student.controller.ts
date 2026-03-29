import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  create(@Body() data: any) {
    return this.studentService.create(data);
  }

  @Get()
  findAll() {
    return this.studentService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.studentService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.studentService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }

  @Get('class/:classId')
  getByClass(@Param('classId') classId: string) {
    return this.studentService.getByClass(classId);
  }

  @Post('promote')
  promoteStudents(@Body() body: { classId: string; newClassId: string }) {
    return this.studentService.promoteStudents(body.classId, body.newClassId);
  }
}
