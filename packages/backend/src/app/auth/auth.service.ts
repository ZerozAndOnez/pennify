import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id });
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  async generateJwt(user: UserDocument): Promise<string> {
    return this.jwtService.sign({ email: user.email, sub: user._id });
  }
}
