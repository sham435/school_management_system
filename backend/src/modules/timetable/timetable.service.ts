import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimetableService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.timetable.findMany({
      include: { class: true, subject: true, teacher: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.timetable.findUnique({
      where: { id },
      include: { class: true, subject: true, teacher: true },
    });
  }

  async create(data: any) {
    return this.prisma.timetable.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.timetable.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.timetable.delete({ where: { id } });
  }

  async getByClassAndSection(classId: string) {
    return this.prisma.timetable.findMany({
      where: { classId },
      include: { subject: true, teacher: true },
    });
  }
}
