import { Module } from '@nestjs/common';
import { FrontOfficeService } from './frontoffice.service';
import { FrontOfficeController } from './frontoffice.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FrontOfficeService],
  controllers: [FrontOfficeController],
  exports: [FrontOfficeService],
})
export class FrontOfficeModule {}
