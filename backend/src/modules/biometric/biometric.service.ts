import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BiometricService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.biometricLog.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.biometricLog.findMany({
      where: { device: { tenantId } },
      include: { device: true },
    });
  }

  async findById(id: string) {
    return this.prisma.biometricLog.findUnique({
      where: { id },
      include: { device: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.biometricLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.biometricLog.delete({ where: { id } });
  }
}
