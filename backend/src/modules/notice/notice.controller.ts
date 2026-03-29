import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  findAll() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.noticeService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.noticeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
