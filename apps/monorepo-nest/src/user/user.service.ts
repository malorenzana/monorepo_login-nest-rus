import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { User } from './entitis/user.entity';


export interface UserFindOne {
    id?: string;
    email?: string;
}


@Injectable()
export class UserService {
    // ! INYECCION DE DEPENDECIAS inyectando (entity)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    // !ACA VA LA LOGICA!!!
    async getMany() {
        const data = await this.userRepository.find()
        return {data}
    }

                            //puede ser opcional el userEntity
    async getOne(id: string, userEntity?: User) {
        const user = await this.userRepository.findOne({where: {id}})
        .then(u => !userEntity ? u : !!u && userEntity.id === u.id ? u : null)
        if (!user) throw new NotFoundException('usuario no existe o no esta autenticado');      //validacion

        return user;
    }


    async createOne(dto: CreateUserDto) {
        const UserExist = await this.userRepository.findOne({where: {email: dto.email}})
        if (UserExist) throw new BadRequestException('Correo registrado, usar otro');

        const newUser = this.userRepository.create(dto);
        const user = await this.userRepository.save(newUser);

        delete user.password
        return user;
    }
    

    async editOne(id: string, dto: EditUserDto, userEntity?: User) {
        const user = await this.getOne(id, userEntity)

        const editedUser = Object.assign(user, dto);
        const newUser = await this.userRepository.save(editedUser);

        delete user.password
        return newUser;
    }


    async deleteOne(id: string, userEntity?: User) {
        const user = await this.getOne(id, userEntity);
       return await this.userRepository.remove(user);
    }

    // !buscar un usuario en la db por medio de email
    async findOne(data: UserFindOne){
        return await this.userRepository
        .createQueryBuilder('user')
        .where(data)
        .addSelect('user.password')
        .getOne()
    }
}
