import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeleIntegrationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.callLog.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.callLog.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.callLog.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.callLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.callLog.delete({ where: { id } });
  }
}
