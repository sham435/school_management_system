import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.attendanceService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.attendanceService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }

  @Post('bulk')
  markBulkAttendance(@Body() data: any[]) {
    return this.attendanceService.markBulkAttendance(data);
  }

  @Get('student/:studentSessionId')
  getByStudent(@Param('studentSessionId') studentSessionId: string) {
    return this.attendanceService.getAttendanceByStudent(studentSessionId);
  }

  @Get('date/:date')
  getByDate(@Param('date') date: string) {
    return this.attendanceService.getAttendanceByDate(new Date(date));
  }
}
