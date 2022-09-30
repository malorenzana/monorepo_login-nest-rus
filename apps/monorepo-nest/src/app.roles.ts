import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN'
}

export enum AppResource {
    USER = 'USER',
    POST = 'POST'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    //TODO AUTHOR ROLES "poseciones"
    .grant(AppRoles.AUTHOR)
    .updateOwn([AppResource.USER])
    .deleteOwn([AppResource.USER])
    .createOwn([AppResource.POST])
    .updateOwn([AppResource.POST])
    .deleteOwn([AppResource.POST])

    //TODO ADMIN ROLES, hereda los permisos del AHUTOR, "poseciones"
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .createAny([AppResource.USER])
    .updateAny([AppResource.POST, AppResource.USER])
    .deleteAny([AppResource.POST, AppResource.USER])





