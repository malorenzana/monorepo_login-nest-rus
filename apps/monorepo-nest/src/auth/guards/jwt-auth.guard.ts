import { AuthGuard } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    //TODO para dar info de errores personalizados (cuando no esta logeado)
    handleRequest(err, user, info ) {
        // You can throw an exception based on either " info " or " err " arguments
        if (err || !user) {
          throw err || new UnauthorizedException('NO ESTAS AUTHENTICADO'); 
        }
        return user;
    }
}