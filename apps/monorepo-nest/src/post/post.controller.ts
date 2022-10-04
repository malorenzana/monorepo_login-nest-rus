import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from '../app.roles';
import { Auth } from '../common/decorators/aut.decorator';
import { CreatePostDto } from './dtos/create-post.dto';
import { EditPostDto } from './dtos/edit-post.dto';
import { PostService } from './post.service';
import { User as UserEntity } from "../user/entitis/user.entity";
import { User } from "../common/decorators/user.decorator";


@ApiTags('Post')
@Controller('post')
export class PostController {
    // ! INYECTION DE DEPENDENCIA
    constructor(
        private readonly postService: PostService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ){}
    // !
        //TODO listando la db
    @Get()
    async getMany() {
        const data = await this.postService.getMany();
        return {
            messge: 'Peticion correcta',
            data
        }
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return this.postService.getOne(id);
    }


    @Auth({
        resource: AppResource.POST,
        action:'create',
        possession: 'own'
    })
    @Post()
    async createdOne(
        @Body() dto:CreatePostDto,
        @User() aut: UserEntity
    ){
        const data = await this.postService.createOne(dto, aut);
        return { message: 'Post Creado', data}
    }


    @Auth({
        resource: AppResource.POST,
        action:'update',
        possession: 'own'
    })
    @Put(':id')
    async editOne(
        @Param('id')id:string,
        @Body() dto: EditPostDto,
        @User() author: UserEntity
    ){
        
        let data;

        if (
            this.rolesBuilder
            .can(author.roles)
            .updateAny(AppResource.POST)
            .granted
        ) {
        //TODO puede editar cualquier POST
        data = await this.postService.editOne(id, dto);
          
        } else {
        //TODO puede editar solo los propios POST
        data = await this.postService.editOne(id, dto, author);
        }
        return { message: 'Post Editado', data}
    }
    @Auth({
        resource: AppResource.POST,
        action:'update',
        possession: 'own'
    })    
    @Delete(':id')
    async deleteOne(
        @Param('id')id:string,
        @User() user: UserEntity
        ){

        let data;

        if(this.rolesBuilder
            .can(user.roles)
            .updateAny(AppResource.POST)
            .granted
        ) {
            //TODO esto es un ADMIN
            data = await this.postService.deleteOne(id)
        } else {
            //TODO esto es un AUTHOR
            data = await this.postService.deleteOne(id, user)
        }
        return { mesage:'usuario eliminado', data }
    }
}
