import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    Logger.log(`AuthService.validateUser, username: ${username} pass: ${pass}`);
    const user = await this.usersService.findOneByUsername(username);

    if (user) {
      const match = await bcrypt.compare(pass, user.password);
      if(match) {
        const { password, ...rest } = user;
        return rest;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
