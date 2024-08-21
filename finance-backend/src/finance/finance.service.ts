import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFinanceDto: CreateFinanceDto, userId: number) {
    const { description, amount, type, category} = createFinanceDto
    try {
      const finance = await this.prisma.finance.create({
        data: {
          description, 
          amount, 
          type, 
          category: category.toLowerCase(),
          userId,
        },
      });
      return finance;
    } catch (error) {
      throw new Error(`Erro ao criar transação: ${error.message}`);
    }
  }

  async findAll(userId: number) {
    try {
      const finances = await this.prisma.finance.findMany({
        where: { userId },
      });
      return finances;
    } catch (error) {
      throw new Error(`Erro ao buscar transações: ${error.message}`);
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const finance = await this.prisma.finance.findFirst({
        where: { id, userId },
      });
      if (!finance) {
        throw new Error('Transação não encontrada');
      }
      return finance;
    } catch (error) {
      throw new Error(`Erro ao buscar transação: ${error.message}`);
    }
  }

  async update(id: number, updateFinanceDto: UpdateFinanceDto) {
    try {
      const finance = await this.prisma.finance.update({
        where: { id },
        data: updateFinanceDto,
      });
      return finance;
    } catch (error) {
      throw new Error(`Erro ao atualizar transação: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const finance = await this.prisma.finance.deleteMany({
        where: { id },
      });
      if (!finance.count) {
        throw new Error('Transação não encontrada ou usuário não autorizado');
      }
      return { message: 'Transação removida com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao remover transação: ${error.message}`);
    }
  }
}
