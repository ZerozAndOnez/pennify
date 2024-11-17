import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import type { SecureUser, SecureUserClientEnd } from '../schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<SecureUserClientEnd> {
    await this.authService.signup(body.email, body.password);
    return this.login(body, res);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<SecureUserClientEnd> {
    const { refreshToken, ...user } = await this.authService.login(
      body.email,
      body.password
    );
    await this.authService.setAuthCookies(
      res,
      body.email,
      user.accessToken,
      refreshToken
    );
    return user as SecureUserClientEnd;
  }

  @Post('refresh')
  async refresh(
    @Body() body: { email: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<SecureUserClientEnd> {
    const refreshToken =
      req.cookies[this.authService.getHashedRefreshTokenCookieName(body.email)];

    if (!refreshToken) {
      throw new UnauthorizedException(
        'No refresh token provided for the selected account'
      );
    }

    const { refreshToken: refreshedToken, ...user } =
      await this.authService.refreshAccessToken(body.email, refreshToken);

    await this.authService.setAuthCookies(
      res,
      body.email,
      user.accessToken,
      refreshedToken
    );

    return user;
  }

  @Post('logout')
  async logout(
    @Body() body: SecureUser,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    res.clearCookie(
      this.authService.getHashedRefreshTokenCookieName(body.email)
    );
    res.clearCookie('accessToken');
  }
}
