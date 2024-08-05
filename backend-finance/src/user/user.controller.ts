import {
    Controller,
    Post,
    Body,
    Put,
    Param,
    Get,
    UseGuards,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }

    @Post('login')
    async login (@Body() {email, password}: {email: string; password: string}) {
        return this.usersService.login(email,password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        return this.usersService.getProfile(req.user.userId);
    }

    @UseGuards(AuthGuard)
    @Put('editProfile/:id')
    async updateProfile(
        @Param('id') id: number,
        @Body() UpdateUserDto: UpdateUserDto,
        @Req() req,
    ) {
        // if (req.user.userId !== id) {
        //     throw new UnauthorizedException();
        // }
        return this.usersService.update(id, UpdateUserDto)
    }
 }
