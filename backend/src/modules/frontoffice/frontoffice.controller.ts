import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FrontOfficeService } from './frontoffice.service';

@Controller('frontoffice')
export class FrontOfficeController {
  constructor(private frontOfficeService: FrontOfficeService) {}

  @Post()
  create(@Body() data: any) {
    return this.frontOfficeService.create(data);
  }

  @Get()
  findAll() {
    return this.frontOfficeService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.frontOfficeService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.frontOfficeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frontOfficeService.remove(id);
  }
}
