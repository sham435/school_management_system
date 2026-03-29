import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MisService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.mISReport.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.mISReport.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.mISReport.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.mISReport.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.mISReport.delete({ where: { id } });
  }
}
