import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WhatsAppService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.whatsappLog.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.whatsappLog.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.whatsappLog.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.whatsappLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.whatsappLog.delete({ where: { id } });
  }
}
