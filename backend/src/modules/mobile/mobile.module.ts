import { Module } from '@nestjs/common';
import { MobileService } from './mobile.service';
import { MobileController } from './mobile.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MobileService],
  controllers: [MobileController],
  exports: [MobileService],
})
export class MobileModule {}
