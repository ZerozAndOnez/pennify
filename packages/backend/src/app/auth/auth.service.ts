import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import type { Response } from 'express';
import * as crypto from 'crypto';

import { setCookie } from '../../utils/cookies/cookie.utils';
import { hash } from '../../utils/hashing/hashing.utils';
import {
  addMinutes,
  convertMillisecondsToSeconds,
} from '../../utils/datetime/datetime.utils';
import { AppConfigService } from './../app-config/app-config.service';
import {
  SecureUser,
  User,
  UserAuthenticated,
  UserDocument,
} from '../schemas/user.schema';
import { EmailService } from '../../common/email/email.service';
import {
  PasswordResetToken,
  PasswordResetTokenDocument,
} from '../schemas/password-reset-token.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
    private emailService: EmailService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(PasswordResetToken.name)
    private passwordResetTokenModel: Model<PasswordResetTokenDocument>
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

  async generatePasswordResetToken(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await this.hashPassword(token);
    // TODO TODOLuxury: Move token expiry duration to a config file
    const EXPIRATION_DURATION_IN_MINUTES = 15;
    const expiresAt = addMinutes(new Date(), EXPIRATION_DURATION_IN_MINUTES);

    await this.passwordResetTokenModel.findOneAndUpdate(
      { email },
      { token: hashedToken, expiresAt },
      { upsert: true, new: true }
    );

    /**
     * Use jwtToken to make the reset link more robust with email
     * without exposing the token in the URL and needing to rely on
     * separators like : to split the token from the email
     */
    const jwtToken = this.jwtService.sign(
      { email, token },
      { expiresIn: `${EXPIRATION_DURATION_IN_MINUTES}m` }
    );
    // TODO TODOLuxury: Move routes to common constants file in monorepo
    const resetLink = `${process.env.FRONTEND_URL}/auth/password-reset?token=${jwtToken}`;
    const subject = 'Password Reset Request';
    const text = `You requested a password reset. Click the link to reset your password: ${resetLink}`;
    const html = `<p>You requested a password reset. Click the link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>
    <p>You are free to reply to this email but don't expect a response.</p>`;

    await this.emailService.sendMail(email, subject, text, html);
  }

  async validatePasswordResetToken(jwtToken: string): Promise<string> {
    let payload: { email: string; token: string };

    try {
      payload = this.jwtService.verify(jwtToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException(
        'Invalid or expired password reset token'
      );
    }

    const { email, token } = payload;
    const resetToken = await this.passwordResetTokenModel.findOne({ email });
    if (!resetToken || resetToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Expired password reset token');
    }

    const isValid = await this.validatePassword(token, resetToken.token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password reset token');
    }

    return email;
  }

  async passwordReset(token: string, newPassword: string): Promise<void> {
    const email = await this.validatePasswordResetToken(token);
    const hashedPassword = await this.hashPassword(newPassword);

    await this.userModel.updateOne({ email }, { password: hashedPassword });
    await this.passwordResetTokenModel.deleteOne({ token });
  }

  getHashedRefreshTokenCookieName(email: string): string {
    return `refreshToken_${hash(email)}`;
  }
}
