import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ScholarshipService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.scholarship.findMany();
  }

  async findOne(id: string) {
    return this.prisma.scholarship.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.scholarship.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.scholarship.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.scholarship.delete({ where: { id } });
  }
}
