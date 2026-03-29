import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.class.findMany({
      include: { sections: true, subjects: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.class.findUnique({
      where: { id },
      include: { sections: true, subjects: true },
    });
  }

  async create(data: any) {
    return this.prisma.class.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.class.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.class.delete({ where: { id } });
  }
}
