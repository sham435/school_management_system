import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MobileService } from './mobile.service';

@Controller('mobile')
export class MobileController {
  constructor(private mobileService: MobileService) {}

  @Post()
  create(@Body() data: any) {
    return this.mobileService.create(data);
  }

  @Get()
  findAll() {
    return this.mobileService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.mobileService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.mobileService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileService.remove(id);
  }
}
