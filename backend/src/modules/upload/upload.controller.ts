import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  create(@Body() data: any) {
    return this.uploadService.create(data);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.uploadService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.uploadService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}
