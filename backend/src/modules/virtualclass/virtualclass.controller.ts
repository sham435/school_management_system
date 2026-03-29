import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VirtualClassService } from './virtualclass.service';

@Controller('virtualclass')
export class VirtualClassController {
  constructor(private virtualClassService: VirtualClassService) {}

  @Post()
  create(@Body() data: any) {
    return this.virtualClassService.create(data);
  }

  @Get()
  findAll() {
    return this.virtualClassService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.virtualClassService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.virtualClassService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.virtualClassService.remove(id);
  }
}
