import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TeleIntegrationService } from './teleintegration.service';

@Controller('teleintegration')
export class TeleIntegrationController {
  constructor(private teleIntegrationService: TeleIntegrationService) {}

  @Post()
  create(@Body() data: any) {
    return this.teleIntegrationService.create(data);
  }

  @Get()
  findAll() {
    return this.teleIntegrationService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.teleIntegrationService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.teleIntegrationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teleIntegrationService.remove(id);
  }
}
