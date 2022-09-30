import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource, AppRoles } from '../app.roles';
import { Auth } from '../common/decorators/aut.decorator';
import { User } from '../common/decorators/user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { User as UserEntity } from './entitis/user.entity';
import { UserService } from './user.service';


@ApiTags('User')
@Controller('user')  // esta es una ruta
export class UserController {

    // ! INYECTION DE DEPENDENCIA inyectando userService
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
        ){}
    // !

    @Get()
    async getMany(){
        return await this.userService.getMany()
    }


    @Get(':id')
    async getOne(
        @Param('id') id: string,
        ){
            const data = await this.userService.getOne(id)
            return data;
        }

    @Post('register')
    async publicRegistration(
        @Body() dto: UserRegistrationDto
    ) {
        const data = await this.userService.createOne ({
            ...dto, roles: [AppRoles.AUTHOR]
        });
        return {
            message: "Usuario registrado",
            data
        }
    }    
    
    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResource.USER
    })
    @Post()
    async createOne(@Body()dto: CreateUserDto){
        const data = await this.userService.createOne(dto)
        return { message: 'Usuario creado', data}
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.USER
    })
    @Put(':id')
    async editOne(
        @Param('id') id: string,
        @Body() dto: EditUserDto,
        @User() user: UserEntity
    ) {
        let data;
        
        if(this.rolesBuilder
            .can(user.roles)
            .updateAny(AppResource.USER)
            .granted
        ) {
            //TODO esto es un ADMIN
            data = await this.userService.editOne(id, dto)
        } else {
            //TODO esto es un AUTHOR
            const { roles, ...rest } = dto; //TODO no permite editar el campo roles 
            data = await this.userService.editOne(id, rest, user)
        }
        return { mesage:'usuario actualizado', data}
    }


    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.USER
    })
    @Delete(':id')
    async deleteOne(
        @Param('id') id: string,
        @User() user: UserEntity
        ) {

        let data;
        
        if(this.rolesBuilder
            .can(user.roles)
            .updateAny(AppResource.USER)
            .granted
        ) {
            //TODO esto es un ADMIN
            data = await this.userService.deleteOne(id)
        } else {
            //TODO esto es un AUTHOR
            data = await this.userService.deleteOne(id, user)
        }
        return { mesage:'usuario eliminado', data }
    }

}
