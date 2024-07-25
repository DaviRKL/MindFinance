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

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const photo = req.file?.buffer;

  const updatedData: any = {};

  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (password) {
    try {
      updatedData.password = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criptografar a senha', error });
    }
  }
  if (photo) updatedData.photo = photo;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o perfil', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha invalida' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou senha invalida' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  try {
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

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    
    const userResponse = {
      ...user,
      photo: user.photo ? user.photo.toString('base64') : null,
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil', error });
  }
};
