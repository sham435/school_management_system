import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.payroll.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.payroll.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.payroll.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.payroll.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.payroll.delete({ where: { id } });
  }
}
