import { Module } from '@nestjs/common';
import { TeleIntegrationService } from './teleintegration.service';
import { TeleIntegrationController } from './teleintegration.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TeleIntegrationService],
  controllers: [TeleIntegrationController],
  exports: [TeleIntegrationService],
})
export class TeleIntegrationModule {}
