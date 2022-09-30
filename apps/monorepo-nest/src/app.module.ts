import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from "nest-access-control";

import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { roles } from './app.roles';
import { 
  DATABASE_HOST, 
  DATABASE_NAME, 
  DATABASE_PASSWORD, 
  DATABASE_PORT, 
  DATABASE_USERNAME 
} from './config/constants';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type:'mysql',
        host:config.get<string>(DATABASE_HOST),
        port:parseInt(config.get<string>(DATABASE_PORT),10),
        username:config.get<string>(DATABASE_USERNAME),
        password:config.get<string>(DATABASE_PASSWORD),
        database:config.get<string>(DATABASE_NAME),
        entities:[__dirname+'./**/**/*entity{.ts,.js}'],
        autoLoadEntities:true,
        synchronize:true,
        logging:true,
        logger:'file',
      })
    }),

    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UserModule,
    PostModule
  ],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
