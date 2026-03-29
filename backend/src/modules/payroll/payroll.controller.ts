import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private payrollService: PayrollService) {}

  @Post()
  create(@Body() data: any) {
    return this.payrollService.create(data);
  }

  @Get()
  findAll() {
    return this.payrollService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.payrollService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.payrollService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(id);
  }
}
