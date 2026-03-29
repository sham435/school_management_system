import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.upload.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.upload.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.upload.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.upload.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.upload.delete({ where: { id } });
  }
}
