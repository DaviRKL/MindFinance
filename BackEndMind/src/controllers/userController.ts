import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  

  const photo = req.file?.buffer;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email já em uso' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email, } });

  if (!user) {
    return res.status(401).json({ error: 'Email ou senha invalida' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Email ou senha invalida' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.json({ token });
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true, 
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(user);
};
