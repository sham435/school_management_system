import { Module } from '@nestjs/common';
import { EexamService } from './eexam.service';
import { EexamController } from './eexam.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EexamService],
  controllers: [EexamController],
  exports: [EexamService],
})
export class EexamModule {}
