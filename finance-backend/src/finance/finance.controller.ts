import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req, Res} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('finances')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() createFinanceDto: CreateFinanceDto) {
    const userId = (req as any).user.userId;

    try {
      const finance = await this.financeService.create(createFinanceDto, userId);
      return { statusCode: HttpStatus.CREATED, data: finance };
    } catch (error) {
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: error.message };
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const userId = (req as any).user.id;

    try {
      const finances = await this.financeService.findAll(userId);
      return res.status(HttpStatus.OK).json(finances);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: 'Não foi possível encontrar transações'});
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.financeService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto, @Res() res: Response) {
    try {
      const finance = await this.financeService.update(+id, updateFinanceDto);
      return res.json(finance);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao atualizar transação' });
    }
  }
 
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.financeService.remove(+id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao deletar transação' });
    }
  }
}
