import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.leaveRequest.findMany({
      include: { employee: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.leaveRequest.findUnique({
      where: { id },
      include: { employee: true },
    });
  }

  async create(data: any) {
    return this.prisma.leaveRequest.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.leaveRequest.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.leaveRequest.delete({ where: { id } });
  }

  async getByEmployee(employeeId: string) {
    return this.prisma.leaveRequest.findMany({
      where: { employeeId },
    });
  }
}
