import { Module } from '@nestjs/common';
import { VehicleTrackingService } from './vehicletracking.service';
import { VehicleTrackingController } from './vehicletracking.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VehicleTrackingService],
  controllers: [VehicleTrackingController],
  exports: [VehicleTrackingService],
})
export class VehicleTrackingModule {}
