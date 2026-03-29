import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EexamService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.exam.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.exam.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.exam.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.exam.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}
