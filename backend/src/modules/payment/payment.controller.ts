import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.paymentService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.paymentService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }

  @Get('student/:studentSessionId')
  getByStudent(@Param('studentSessionId') studentSessionId: string) {
    return this.paymentService.getPaymentByStudent(studentSessionId);
  }

  @Get('fee/:studentFeeId')
  getByFee(@Param('studentFeeId') studentFeeId: string) {
    return this.paymentService.getPaymentByFee(studentFeeId);
  }
}
