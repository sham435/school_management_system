import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.notificationService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.notificationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }
}
