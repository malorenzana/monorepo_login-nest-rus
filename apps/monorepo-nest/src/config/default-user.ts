// import { ConfigService } from '@nestjs/config'
// import { User } from '../user/entitis/user.entity'
// import { DEFAULT_USER_EMAIL} from './constants'
// import { DEFAULT_USER_PASSWORD } from './constants'
// import { CreateUserDto } from '../user/dtos/create-user.dto';
// import { getRepository } from 'typeorm';


// export const setDefaultUser = async (config: ConfigService) => {

    
//     const userRepository = config.getRepository<User>(User)

//     var user = new CreateUserDto();
//     user.email= config.get<string>(DEFAULT_USER_EMAIL)
//     user.password = config.get<string>(DEFAULT_USER_PASSWORD)
//     user.roles = ['ADMIN']
 

    
//     const defaultUser = await userRepository
//         .createQueryBuilder()
//         .where('email = :email', { email: config.get<string>('DEFAULT_USER_EMAIL')})
//         .getOne()

//     if(!defaultUser) {
//         const adminUser = userRepository.create ({
//             email: config.get<string>(DEFAULT_USER_EMAIL),
//             password: config.get<string>(DEFAULT_USER_PASSWORD),
//             roles: ['ADMIN']
//         })
//         return await userRepository.save(adminUser)
//     }
//  }