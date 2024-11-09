import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { PennifyConfigModule } from '../../config/pennify-config.module';
import { PennifyConfigService } from '../../config/pennify-config.service';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PennifyConfigModule,
    JwtModule.registerAsync({
      imports: [PennifyConfigModule],
      useFactory: async (pennifyConfigService: PennifyConfigService) => ({
        secret: pennifyConfigService.jwtSecret,
        signOptions: { expiresIn: '8h' },
      }),
      inject: [PennifyConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
