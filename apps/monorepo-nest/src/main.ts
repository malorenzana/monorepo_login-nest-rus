import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD, SERVER_PORT } from './config/constants';
// import { setDefaultUser } from './config/default-user';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ! PARA MOSTRAR EN CONSOLA QUE PUERTO ESTA LEVANTADA LA APP
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  
  initSwagger(app);
  // setDefaultUser(config);
  // logger.log(config.get<string>(DEFAULT_USER_EMAIL));
  


  

  // ! PARA VALIDACIONES CON EL DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  logger.log(`Server is running ${ await app.getUrl() }`);
}
bootstrap();

