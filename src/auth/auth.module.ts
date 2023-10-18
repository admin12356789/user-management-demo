import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { User, UserSchema } from 'src/users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import UsersService from 'src/users/users.service';
// import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { JwtStrategy } from './jwt.strategy';
// dotenv.config();

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // JwtModule.register({
    //     secret: process.env.JWT_SECRET,
    //     signOptions:{
    //       expiresIn: process.env.JWT_EXPIRES
    //     }

    //   })
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
