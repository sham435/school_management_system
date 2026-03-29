import { Module } from '@nestjs/common';
import { QAService } from './qa.service';
import { QAController } from './qa.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QAController],
  providers: [QAService],
  exports: [QAService],
})
export class QAModule {}
