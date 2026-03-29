import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { QAService } from './qa.service';
import { CreateQAEvaluationDto, UpdateQAEvaluationDto, QAEvaluationQueryDto } from './qa.dto';

@Controller('qa')
export class QAController {
  constructor(private readonly qaService: QAService) {}

  @Post()
  create(@Body() createQAEvaluationDto: CreateQAEvaluationDto) {
    return this.qaService.create(createQAEvaluationDto);
  }

  @Get()
  findAll(@Query() query: QAEvaluationQueryDto) {
    return this.qaService.findAll(query);
  }

  @Get('dashboard')
  getDashboardStats(@Query('tenantId') tenantId: string) {
    return this.qaService.getDashboardStats(tenantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.qaService.findOne(id);
  }

  @Get(':id/summary')
  getGroupSummary(@Param('id', ParseUUIDPipe) id: string) {
    return this.qaService.getGroupSummary(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQAEvaluationDto: UpdateQAEvaluationDto,
  ) {
    return this.qaService.update(id, updateQAEvaluationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.qaService.remove(id);
  }
}
