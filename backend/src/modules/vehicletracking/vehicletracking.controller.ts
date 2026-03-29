import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VehicleTrackingService } from './vehicletracking.service';

@Controller('vehicletracking')
export class VehicleTrackingController {
  constructor(private vehicleTrackingService: VehicleTrackingService) {}

  @Post()
  create(@Body() data: any) {
    return this.vehicleTrackingService.create(data);
  }

  @Get()
  findAll() {
    return this.vehicleTrackingService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.vehicleTrackingService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.vehicleTrackingService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleTrackingService.remove(id);
  }
}
