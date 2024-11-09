import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PennifyConfigService } from '../../config/pennify-config.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(pennifyConfigService: PennifyConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: pennifyConfigService.jwtSecret,
    });
  }

  // Don't remove, since it's required by NestJS's flow for handling Passport library's strategies
  async validate(payload: { sub: string; email: string }) {
    return { userId: payload.sub, email: payload.email };
  }
}
