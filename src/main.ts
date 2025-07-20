import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap")

  app.setGlobalPrefix("api")

  app.use(helmet())
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist:true,
      forbidNonWhitelisted:true
    })
  )

  const config = new DocumentBuilder()
    .setTitle("Dermantin Market")
    .setDescription("Dermantin api backend documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/api/docs",app, document)

  const PORT = process.env.PORT ?? 3030

  await app.listen(PORT, ()=>{
    logger.log(`Server running on: http://localhost:${PORT}/api`)
    logger.log(`Swagger available on: http://localhost:${PORT}/api/docs`)
  });
}
bootstrap();
