import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare } from "bcryptjs";  //para comparar contrasena encriptada
import { User } from '../user/entitis/user.entity';



@Injectable()
export class AuthService {

    // ! injectando dependencia UserService.ts
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,

    ){}

    async validateUser(email:string, password: string): Promise<any> {
        const user = await this.userService.findOne({ email });

        //TODO comparando password hasheada con la del cliente
        if (user && await compare(password, user.password)) {
            const { password, ...rest } = user; //borrando password de cuando se logea y retorna el usuario
            return rest;
        }
        return null;
    }


    login (user: User) {
        const { id, ...rest } = user; //restructurando el obj user sacando el id del objeto (datos)
        const payload = { sub: id};
        return {
            user,
            accesToken: this.jwtService.sign(payload) //generando el token y alacenando en esta propiedad
        }
    }
}
