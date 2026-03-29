import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NoticeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.notice.findMany();
  }

  async findOne(id: string) {
    return this.prisma.notice.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.notice.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.notice.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.notice.delete({ where: { id } });
  }
}
