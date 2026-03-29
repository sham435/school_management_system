import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SmsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.smsLog.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.smsLog.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.smsLog.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.smsLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.smsLog.delete({ where: { id } });
  }
}
