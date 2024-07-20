import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createFinance = async (req: Request, res: Response) => {
  const { description, amount, type } = req.body;

  const finance = await prisma.finance.create({
    data: {
      description,
      amount,
      type,
      userId: req.userId,
    },
  });

  res.status(201).json(finance);
};

export const getFinances = async (req: Request, res: Response) => {
  const finances = await prisma.finance.findMany({
    where: { userId: req.userId },
  });

  res.json(finances);
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
