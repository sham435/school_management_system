import { Module } from '@nestjs/common';
import { VirtualClassService } from './virtualclass.service';
import { VirtualClassController } from './virtualclass.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VirtualClassService],
  controllers: [VirtualClassController],
  exports: [VirtualClassService],
})
export class VirtualClassModule {}
