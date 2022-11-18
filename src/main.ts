import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['debug', 'log', 'verbose']
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Test NestJS app')
    .setDescription('Rest API')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.enableCors()
  await app.listen(process.env.PORT || 3000)

}
bootstrap()
