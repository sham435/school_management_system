import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { BarcodeController } from './barcode.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BarcodeService],
  controllers: [BarcodeController],
  exports: [BarcodeService],
})
export class BarcodeModule {}
