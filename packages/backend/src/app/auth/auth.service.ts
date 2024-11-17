import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import type { Response } from 'express';

import { setCookie } from '../../utils/cookies/cookie.utils';
import { hash } from '../../utils/hashing/hashing.utils';
import { convertMillisecondsToSeconds } from '../../utils/datetime/datetime.utils';
import { AppConfigService } from './../app-config/app-config.service';
import {
  SecureUser,
  User,
  UserAuthenticated,
  UserDocument,
} from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  private getSecureUser = (user: User): SecureUser => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...secureUser } = user;
    return secureUser;
  };

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id });
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  async generateJwt(user: UserDocument, maxAge: number): Promise<string> {
    return this.jwtService.sign(
      { email: user.email, sub: user._id },
      { expiresIn: convertMillisecondsToSeconds(maxAge) }
    );
  }

  async generateRefreshToken(
    user: UserDocument,
    duration: number
  ): Promise<string> {
    return this.jwtService.sign(
      { email: user.email, sub: user._id },
      { expiresIn: convertMillisecondsToSeconds(duration) }
    );
  }

  async signup(email: string, password: string): Promise<SecureUser> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return this.getSecureUser(savedUser.toObject());
  }

  private regenrateTokens = async (
    user: UserDocument
  ): Promise<UserAuthenticated> => {
    const config = await this.appConfigService.get();
    const accessToken = await this.generateJwt(
      user,
      config.maxAgeInMilliseconds
    );
    const refreshToken = await this.generateRefreshToken(
      user,
      config.refreshTokenDurationInMilliseconds
    );

    return { ...this.getSecureUser(user), accessToken, refreshToken };
  };

  async login(email: string, password: string): Promise<UserAuthenticated> {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user || !(await this.validatePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.regenrateTokens(user as UserDocument);
  }

  async validateRefreshToken(
    email: string,
    refreshToken: string
  ): Promise<SecureUser | null> {
    const payload = this.jwtService.verify(refreshToken);

    if (payload.email !== email) {
      return null;
    }

    const user = await this.userModel.findOne({ email }).lean();
    return this.getSecureUser(user as UserDocument);
  }

  async refreshAccessToken(
    email: string,
    refreshToken: string
  ): Promise<UserAuthenticated> {
    const user = await this.validateRefreshToken(email, refreshToken);
    if (!user) {
      throw new UnauthorizedException(
        'Invalid refresh token for the selected account'
      );
    }

    return this.regenrateTokens(user as UserDocument);
  }

  async setAuthCookies(
    res: Response,
    email: string,
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    const config = await this.appConfigService.get();
    const refreshTokenCookieName = this.getHashedRefreshTokenCookieName(email);

    setCookie(res, 'accessToken', accessToken, {
      maxAge: config.maxAgeInMilliseconds,
    });

    setCookie(res, refreshTokenCookieName, refreshToken, {
      maxAge: config.refreshTokenDurationInMilliseconds,
    });
  }

  getHashedRefreshTokenCookieName(email: string): string {
    return `refreshToken_${hash(email)}`;
  }
}
