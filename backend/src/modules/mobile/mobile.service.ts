import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MobileService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.mobileDevice.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.mobileDevice.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.mobileDevice.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.mobileDevice.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.mobileDevice.delete({ where: { id } });
  }
}
