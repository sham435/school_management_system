import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.libraryBook.findMany();
  }

  async findOne(id: string) {
    return this.prisma.libraryBook.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.libraryBook.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.libraryBook.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.libraryBook.delete({ where: { id } });
  }
}
