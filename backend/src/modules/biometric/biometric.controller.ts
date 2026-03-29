import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BiometricService } from './biometric.service';

@Controller('biometric')
export class BiometricController {
  constructor(private biometricService: BiometricService) {}

  @Post()
  create(@Body() data: any) {
    return this.biometricService.create(data);
  }

  @Get()
  findAll() {
    return this.biometricService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.biometricService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.biometricService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biometricService.remove(id);
  }
}
