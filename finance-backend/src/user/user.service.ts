import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(CreateUserDto: CreateUserDto) {
    const { name, email, password, photo } = CreateUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          photo: photo ? Buffer.from(photo, 'base64') : undefined,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email já em uso',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email, password, photo } = updateUserDto;
    const updatedData: any = {};

    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) {
      try {
        updatedData.password = await bcrypt.hash(password, 10);
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Erro ao criptografar a senha',
            error: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    if (photo) updatedData.photo = Buffer.from(photo, 'base64');

    try {
      const user = await this.prisma.user.update({
        where: { id: Number(id) },
        data: updatedData,
      });
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao atualizar o perfil',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Email ou senha inválida',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Email ou senha inválida',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      const token = this.jwtService.sign({ userId: user.id });

      return { token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Email ou senha inválida',
          error: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
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
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Usuário não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const userResponse = {
        ...user,
        photo: user.photo ? user.photo.toString('base64') : null,
      };

      return userResponse;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao buscar perfil',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
