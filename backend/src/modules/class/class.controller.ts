import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.classService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.classService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
