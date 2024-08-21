import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FinanceType } from '@prisma/client';

export class CreateFinanceDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsEnum(FinanceType)
    type: FinanceType;

    @IsNotEmpty()
    @IsString()
    category: string;
}
