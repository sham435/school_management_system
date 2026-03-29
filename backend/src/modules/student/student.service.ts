import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.student.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.student.findMany({
      where: { tenantId },
      include: { user: true, class: true, section: true }
    });
  }

  async findById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: { user: true, class: true, section: true, attendances: true, payments: true, examResults: true }
    });
  }

  async update(id: string, data: any) {
    return this.prisma.student.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.student.delete({ where: { id } });
  }

  async getByClass(classId: string) {
    return this.prisma.student.findMany({
      where: { classId },
      include: { user: true, section: true }
    });
  }

  async promoteStudents(classId: string, newClassId: string) {
    return this.prisma.student.updateMany({
      where: { classId },
      data: { classId: newClassId, promotedAt: new Date() }
    });
  }
}
