import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitis/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],

  // ! para usarlo fuera de este modulo
  exports: [UserService]
})
export class UserModule {}
