import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VirtualClassService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.virtualClass.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.virtualClass.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.virtualClass.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.virtualClass.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.virtualClass.delete({ where: { id } });
  }
}
