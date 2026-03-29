import { Module } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { ScholarshipController } from './scholarship.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScholarshipController],
  providers: [ScholarshipService],
  exports: [ScholarshipService],
})
export class ScholarshipModule {}
