import { IsString, IsEmail, IsNotEmpty, IsOptional, IsBase64 } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    photo?: string;
}