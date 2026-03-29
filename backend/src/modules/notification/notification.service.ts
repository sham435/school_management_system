import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.notification.findMany();
  }

  async findOne(id: string) {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.notification.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.notification.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }
}
