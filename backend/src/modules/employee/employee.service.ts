import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.employee.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    return this.prisma.employee.findUnique({ where: { id }, include: { user: true } });
  }

  async create(data: any) {
    return this.prisma.employee.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }
}
