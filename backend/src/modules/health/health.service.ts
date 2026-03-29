import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.healthRecord.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.healthRecord.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.healthRecord.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.healthRecord.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.healthRecord.delete({ where: { id } });
  }
}
