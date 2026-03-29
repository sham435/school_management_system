import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VehicleTrackingService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.vehicleLocation.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.vehicleLocation.findMany({
      where: { OR: [{ tenantId }, { tenantId: null }] },
      include: { vehicle: true },
    });
  }

  async findById(id: string) {
    return this.prisma.vehicleLocation.findUnique({
      where: { id },
      include: { vehicle: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.vehicleLocation.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.vehicleLocation.delete({ where: { id } });
  }

  async findByVehicle(vehicleId: string) {
    return this.prisma.vehicleLocation.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
