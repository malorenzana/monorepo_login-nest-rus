import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

//! Funcion abstracta
@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}