import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BarcodeService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.libraryBook.create({ data });
  }

  async findAll(tenantId: string) {
    return this.prisma.libraryBook.findMany({ where: { tenantId } });
  }

  async findById(id: string) {
    return this.prisma.libraryBook.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.libraryBook.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.libraryBook.delete({ where: { id } });
  }

  async findByBarcode(barcode: string) {
    return this.prisma.libraryBook.findUnique({ where: { barcode } });
  }
}
