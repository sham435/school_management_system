import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.libraryService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.libraryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(id);
  }
}
