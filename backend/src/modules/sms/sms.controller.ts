import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post()
  create(@Body() data: any) {
    return this.smsService.create(data);
  }

  @Get()
  findAll() {
    return this.smsService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.smsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.smsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smsService.remove(id);
  }
}
