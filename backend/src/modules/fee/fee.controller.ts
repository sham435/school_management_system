import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FeeService } from './fee.service';

@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get()
  findAll() {
    return this.feeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feeService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.feeService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.feeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feeService.remove(id);
  }

  @Get('student/:studentId')
  getFeeByStudent(@Param('studentId') studentId: string) {
    return this.feeService.getFeeByStudent(studentId);
  }
}
