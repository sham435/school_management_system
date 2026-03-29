import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.section.findMany({
      include: { class: true, students: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.section.findUnique({
      where: { id },
      include: { class: true, students: true },
    });
  }

  async create(data: any) {
    return this.prisma.section.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.section.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.section.delete({ where: { id } });
  }

  async getByClass(classId: string) {
    return this.prisma.section.findMany({
      where: { classId },
    });
  }
}
