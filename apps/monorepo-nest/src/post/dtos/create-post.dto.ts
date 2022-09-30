import { IsArray, IsBoolean, IsEnum, IsString } from "class-validator";
import { EnumToString } from "../../common/helpers/enum.ToString";
import { PostCategory } from "../enums/post-category.enum";

export class CreatePostDto {

    @IsString()
    title:string;

    @IsString()
    slug: string;

    @IsString()
    excerpt: string;

    @IsString()
    content: string;

    @IsEnum(PostCategory, {
        message: `opcion invalida. las opciones correctas son: ${EnumToString(PostCategory)}`
    })
    category: PostCategory;

    @IsArray()
    @IsString({ each: true})
    tags: string [];

    @IsBoolean()
    status: boolean;


}