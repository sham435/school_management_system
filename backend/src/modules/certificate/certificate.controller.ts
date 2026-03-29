import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.certificateService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.certificateService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateService.remove(id);
  }
}
