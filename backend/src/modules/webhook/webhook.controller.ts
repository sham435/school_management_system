import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private webhookService: WebhookService) {}

  @Post()
  create(@Body() data: any) {
    return this.webhookService.create(data);
  }

  @Get()
  findAll() {
    return this.webhookService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.webhookService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.webhookService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhookService.remove(id);
  }
}
