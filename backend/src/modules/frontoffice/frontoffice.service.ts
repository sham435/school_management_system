import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FrontOfficeService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.frontOfficeLog.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.frontOfficeLog.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.frontOfficeLog.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.frontOfficeLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.frontOfficeLog.delete({ where: { id } });
  }
}
