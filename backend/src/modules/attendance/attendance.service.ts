import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AttendanceStatus } from '@prisma/client';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.attendance.findMany({
      include: { student: true, class: true, markedBy: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.attendance.findUnique({
      where: { id },
      include: { student: true, class: true, markedBy: true },
    });
  }

  async create(data: any) {
    return this.prisma.attendance.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.attendance.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.attendance.delete({ where: { id } });
  }

  async markBulkAttendance(data: { studentId: string; classId: string; date: Date; status: AttendanceStatus; remarks?: string }[]) {
    const results = [];
    for (const item of data) {
      const existing = await this.prisma.attendance.findFirst({
        where: {
          studentId: item.studentId,
          date: item.date,
        },
      });
      if (existing) {
        results.push(await this.prisma.attendance.update({
          where: { id: existing.id },
          data: { status: item.status, remarks: item.remarks },
        }));
      } else {
        results.push(await this.prisma.attendance.create({
          data: item,
        }));
      }
    }
    return results;
  }

  async getAttendanceByStudent(studentId: string) {
    return this.prisma.attendance.findMany({
      where: { studentId },
      orderBy: { date: 'desc' },
    });
  }

  async getAttendanceByDate(date: Date) {
    return this.prisma.attendance.findMany({
      where: { date },
      include: { student: true, class: true, markedBy: true },
    });
  }
}
