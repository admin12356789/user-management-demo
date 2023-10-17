import { Module } from '@nestjs/common';
import {MongooseModule } from '@nestjs/mongoose'
import {ConfigModule , ConfigService} from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema :  Joi.object({
        // MONGO_USERNAME: Joi.string().required(),
        // MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE') || 'users';
        const host = configService.get('MONGO_HOST') 

        return {
          // uri: `mongodb://${username}:${password}@${host}`,
          uri: `mongodb://${host}/`,
          dbName: database,
        };
      },
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
