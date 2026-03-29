import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timetableService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.timetableService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.timetableService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timetableService.remove(id);
  }

  @Get('class/:classId')
  getByClass(
    @Param('classId') classId: string,
  ) {
    return this.timetableService.getByClassAndSection(classId);
  }
}
