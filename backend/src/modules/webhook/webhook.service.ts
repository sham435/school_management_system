import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.webhookLog.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.webhookLog.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.webhookLog.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.webhookLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.webhookLog.delete({ where: { id } });
  }
}
