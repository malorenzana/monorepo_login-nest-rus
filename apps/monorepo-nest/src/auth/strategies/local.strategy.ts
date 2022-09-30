import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email', // 'username'
            passwordField: 'password' // 'password'
        })
    }

    // ! Metod 
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password)
        if (!user) throw new UnauthorizedException('Usuario o Contraseña no coincide')
        return user;
    }
}