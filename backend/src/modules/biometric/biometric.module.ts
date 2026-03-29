import { Module } from '@nestjs/common';
import { BiometricService } from './biometric.service';
import { BiometricController } from './biometric.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BiometricService],
  controllers: [BiometricController],
  exports: [BiometricService],
})
export class BiometricModule {}
