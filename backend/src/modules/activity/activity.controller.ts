import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.activityService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.activityService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
