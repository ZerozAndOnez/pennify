import { Body, Controller, Post } from '@nestjs/common';

import { User } from '../schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string }
  ): Promise<User> {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string }
  ): Promise<{ accessToken: string }> {
    return this.authService.login(body.email, body.password);
  }
}
