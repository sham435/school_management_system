import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Post()
  create(@Body() data: any) {
    return this.healthService.create(data);
  }

  @Get()
  findAll() {
    return this.healthService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.healthService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.healthService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthService.remove(id);
  }
}
