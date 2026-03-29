import { Module } from '@nestjs/common';
import { MisService } from './mis.service';
import { MisController } from './mis.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MisService],
  controllers: [MisController],
  exports: [MisService],
})
export class MisModule {}
