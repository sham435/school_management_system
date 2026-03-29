import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BarcodeService } from './barcode.service';

@Controller('barcode')
export class BarcodeController {
  constructor(private barcodeService: BarcodeService) {}

  @Post()
  create(@Body() data: any) {
    return this.barcodeService.create(data);
  }

  @Get()
  findAll() {
    return this.barcodeService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.barcodeService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.barcodeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barcodeService.remove(id);
  }
}
