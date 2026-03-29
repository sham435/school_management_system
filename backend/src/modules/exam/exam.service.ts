import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.exam.findMany({
      include: { academicYear: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.exam.findUnique({
      where: { id },
      include: { academicYear: true },
    });
  }

  async create(data: any) {
    return this.prisma.exam.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.exam.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }

  async getExamByClass(classId: string) {
    return this.prisma.exam.findMany({
      where: { schedules: { some: { classId } } },
    });
  }
}
