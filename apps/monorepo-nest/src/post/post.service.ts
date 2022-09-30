import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entitis/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { EditPostDto } from './dtos/edit-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {

    // ! INYECCION DE DEPENDECIAS
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ){}
    // !


    // !ACA VA LA LOGICA!!!
    async getMany(): Promise<Post[]>{
        return await this.postRepository.find()
    }


    async getOne(id: string, author?: User){
        const post = await this.postRepository.findOne({where:{id:id}})
        .then(p => !author ? p : !!p && author.id === p.author.id ? p : null)
        if (!post) throw new NotFoundException('Post no existe o no esta autorisado')
        return post
    }


    async createOne(dto: CreatePostDto, author: User){
        const post = this.postRepository.create({...dto as any, author}); // as any
        return await this.postRepository.save(post); 
    }


    async editOne(id:string, dto: EditPostDto, author?: User){
        const post = await this.getOne(id, author);
        if (!post) throw new NotFoundException('post no encontrado');

        const editedPost = Object.assign(post, dto);
        return await this.postRepository.save(editedPost);
    }


    async deleteOne(id: string, author?: User){
        const post = await this.getOne(id, author)
       return await this.postRepository.remove(post);
    }
}
