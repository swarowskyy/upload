import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 import { App } from './app/app';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //NÃO ESQUECER
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
