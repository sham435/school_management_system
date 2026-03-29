import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HrService } from './hr.service';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Get()
  findAll() {
    return this.hrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.hrService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.hrService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrService.remove(id);
  }

  @Get('department/:departmentId')
  getByDepartment(@Param('departmentId') departmentId: string) {
    return this.hrService.getByDepartment(departmentId);
  }
}
