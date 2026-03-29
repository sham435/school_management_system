import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdmissionService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const applicationNo = `ADM-${Date.now()}`;
    return this.prisma.admission.create({ data: { ...data, applicationNo } });
  }

  async findAll(tenantId: string) {
    return this.prisma.admission.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.admission.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.admission.update({ where: { id }, data });
  }

  async approve(id: string, approvedBy: string) {
    return this.prisma.admission.update({
      where: { id },
      data: { status: 'ADMITTED', approvedBy, approvedAt: new Date() }
    });
  }

  async reject(id: string, remarks: string) {
    return this.prisma.admission.update({
      where: { id },
      data: { status: 'REJECTED', remarks }
    });
  }
}
