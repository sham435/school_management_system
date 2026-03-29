import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private whatsappService: WhatsAppService) {}

  @Post()
  create(@Body() data: any) {
    return this.whatsappService.create(data);
  }

  @Get()
  findAll() {
    return this.whatsappService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.whatsappService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.whatsappService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappService.remove(id);
  }
}
