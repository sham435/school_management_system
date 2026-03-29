import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FeeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.fee.findMany({
      include: { class: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.fee.findUnique({
      where: { id },
      include: { class: true },
    });
  }

  async create(data: any) {
    return this.prisma.fee.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.fee.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.fee.delete({ where: { id } });
  }

  async getFeeByStudent(studentId: string) {
    return this.prisma.fee.findMany({
      where: { class: { students: { some: { id: studentId } } } },
      include: { class: true },
    });
  }
}
