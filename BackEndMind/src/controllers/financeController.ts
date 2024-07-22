import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createFinance = async (req: Request, res: Response) => {
  const { description, amount, type } = req.body;
  const userId = (req as any).userId;

  const finance = await prisma.finance.create({
    data: {
      description,
      amount,
      type,
      userId: userId,
    },
  });

  res.status(201).json(finance);
};

export const getFinances = async (req: Request, res: Response) => {
  const userId = (req as any).userId;  
  try {
    const finances = await prisma.finance.findMany({
        where: { userId: userId },
      });
    
      res.status(200).json(finances);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possivel encontrar transações' });
  }
  
};

export const updateFinance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, type } = req.body;

  const finance = await prisma.finance.update({
    where: { id: Number(id) },
    data: { description, amount, type },
  });

  res.json(finance);
};

export const deleteFinance = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.finance.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
