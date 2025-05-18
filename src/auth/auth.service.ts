import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    Logger.log(`AuthService.validateUser, username: ${username} pass: ${pass}`);
    const user = await this.usersService.findOneByFirstName(username);
    if (user && user.lastName === pass) { // todo next step lastName -> password
      // const { password, ...result } = user;
      // return result;
      return user;
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
