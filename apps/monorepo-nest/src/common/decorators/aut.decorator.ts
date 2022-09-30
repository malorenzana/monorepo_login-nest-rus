import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from "nest-access-control";
import { JwtAuthGuard } from "../../auth/guards";

//TODO uniendo 2 decoradores que se usan en el controller
export function Auth(...roles: Role[]) {
    return applyDecorators(
        UseGuards(JwtAuthGuard,ACGuard),
        UseRoles(...roles),
        ApiBearerAuth()
    )
}