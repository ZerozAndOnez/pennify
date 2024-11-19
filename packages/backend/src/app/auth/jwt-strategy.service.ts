import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PennifyConfigService } from '../../config/pennify-config.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(pennifyConfigService: PennifyConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['accessToken'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: pennifyConfigService.jwtSecret,
    });
  }

  // Don't remove, since it's required by NestJS's flow for handling Passport library's strategies
  async validate(payload: { sub: string; email: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}
