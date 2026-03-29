import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('admissions')
export class AdmissionController {
  constructor(private admissionService: AdmissionService) {}

  @Post()
  create(@Body() data: any) {
    return this.admissionService.create(data);
  }

  @Get()
  findAll() {
    return this.admissionService.findAll('');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.admissionService.findById(id);
  }

  @Put(':id/approve')
  @UseGuards(JwtAuthGuard)
  approve(@Param('id') id: string, @Body() body: { approvedBy: string }) {
    return this.admissionService.approve(id, body.approvedBy);
  }

  @Put(':id/reject')
  @UseGuards(JwtAuthGuard)
  reject(@Param('id') id: string, @Body() body: { remarks: string }) {
    return this.admissionService.reject(id, body.remarks);
  }
}
