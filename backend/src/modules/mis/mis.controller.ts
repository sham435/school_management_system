import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MisService } from './mis.service';

@Controller('mis')
export class MisController {
  constructor(private misService: MisService) {}

  @Post()
  create(@Body() data: any) {
    return this.misService.create(data);
  }

  @Get()
  findAll() {
    return this.misService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.misService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.misService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.misService.remove(id);
  }
}
