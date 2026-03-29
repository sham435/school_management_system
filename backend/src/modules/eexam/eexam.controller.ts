import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EexamService } from './eexam.service';

@Controller('eexam')
export class EexamController {
  constructor(private eexamService: EexamService) {}

  @Post()
  create(@Body() data: any) {
    return this.eexamService.create(data);
  }

  @Get()
  findAll() {
    return this.eexamService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.eexamService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.eexamService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eexamService.remove(id);
  }
}
