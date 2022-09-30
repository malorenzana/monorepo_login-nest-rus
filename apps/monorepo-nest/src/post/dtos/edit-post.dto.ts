import { CreatePostDto } from "./create-post.dto";
import { PartialType } from '@nestjs/mapped-types'
import { OmitType } from "@nestjs/swagger";

// ! PARA QUE LOS CAMPOS SEAN OPCIONALES 
export class EditPostDto extends PartialType(
    OmitType( CreatePostDto, ['slug'] as const)
) {}