import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createFinance = async (req: Request, res: Response) => {
  const { description, amount, type } = req.body;
  const userId = (req as any).userId;

  try {
    const finance = await prisma.finance.create({
      data: {
        description,
        amount,
        type,
        userId: userId,
      },
    });

    res.status(201).json(finance);
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
};

export const getFinances = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  try {
    const finances = await prisma.finance.findMany({
      where: { userId: userId },
    });

    res.status(200).json(finances);
  } catch (error) {
    console.error('Erro ao obter transações:', error);
    res.status(500).json({ error: 'Não foi possível encontrar transações' });
  }
};

export const updateFinance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, type } = req.body;

  try {
    const finance = await prisma.finance.update({
      where: { id: Number(id) },
      data: { description, amount, type },
    });

    res.json(finance);
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
};

export const deleteFinance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.finance.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
};
