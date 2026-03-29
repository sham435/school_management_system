import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LeaveService } from './leave.service';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.leaveService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.leaveService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveService.remove(id);
  }

  @Get('employee/:employeeId')
  getByEmployee(@Param('employeeId') employeeId: string) {
    return this.leaveService.getByEmployee(employeeId);
  }
}
