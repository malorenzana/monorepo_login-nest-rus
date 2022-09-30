import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';

import { JWT_SECRET } from '../config/constants';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET), 
        signOptions: { expiresIn: '1h' }
      })
    }),
    UserModule,
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  
})
export class AuthModule {}
