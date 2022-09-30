import { 
    IsArray,
    IsEmail, 
    IsEnum, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    MaxLength, 
    MinLength 
} from "class-validator";
import { AppRoles } from "../../app.roles";
import { EnumToString } from "../../common/helpers/enum.ToString";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name:string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    lastName:string;
    
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password:string;

    //todo usado para los roles 
    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `must be a valid role value, ${ EnumToString(AppRoles) }`
    })
    roles: string[];
}
