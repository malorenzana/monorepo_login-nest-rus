import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, LocalAuthGuard,   } from "./guards";
import { User } from '../common/decorators/user.decorator';
import { User as UserEntity } from '../user/entitis/user.entity';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators/aut.decorator';
import { LoginDto } from './dtos/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor (
        private readonly authService: AuthService,
    ){}

    //TODO metodo logear
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @User() user: UserEntity
    ) {
        const data = await this.authService.login(user);
        user.password
        return {
            message: 'login exitoso',
            data
        }
    }


    //TODO logeado con token vivo, tiene permiso para esta ruta
    @Auth()
    @Get('profile')
    profile(
        @User() user: UserEntity
    ) {
        return{
            message:'Peticion Authorizada',
            user
        } 
    }


    //TODO refresh el token
    @Auth()
    @Get ('refresh')
    refreshToken (
        @User() user: UserEntity
    ) {
        const data = this.authService.login(user) ;
        return{
            message : ' Refresh exitoso ' ,
            data
        }
    }
}
