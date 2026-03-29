import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.payment.findMany({
      include: { student: true, fee: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
      include: { student: true, fee: true },
    });
  }

  async create(data: any) {
    return this.prisma.payment.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.payment.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }

  async getPaymentByStudent(studentId: string) {
    return this.prisma.payment.findMany({
      where: { studentId },
      include: { fee: true },
    });
  }

  async getPaymentByFee(feeId: string) {
    return this.prisma.payment.findMany({
      where: { feeId },
    });
  }
}
