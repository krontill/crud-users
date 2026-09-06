import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import {
  AuthenticatedUser,
  JwtAuthenticatedUser,
  LoginResponse,
} from './auth/auth.types';

type LocalAuthenticatedRequest = ExpressRequest & {
  user: AuthenticatedUser;
  logout: (callback: (error: Error | null) => void) => void;
};

type JwtAuthenticatedRequest = ExpressRequest & {
  user: JwtAuthenticatedUser;
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: LocalAuthenticatedRequest): LoginResponse {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: LocalAuthenticatedRequest): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      req.logout((error: Error | null) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: JwtAuthenticatedRequest): JwtAuthenticatedUser {
    return req.user;
  }
}
