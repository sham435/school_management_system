import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Role, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ 
      where: { id },
      include: { student: true, employee: true }
    });
  }

  async create(data: { email: string; password: string; role: Role; firstName: string; lastName: string; tenantId: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({ 
      where: { tenantId },
      include: { student: true, employee: true }
    });
  }

  async update(id: string, data: { firstName?: string; lastName?: string; phone?: string; avatar?: string; status?: UserStatus }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
