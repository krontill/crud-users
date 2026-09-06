import { User } from '../users/entities/user.entity';

export type AuthenticatedUser = Omit<User, 'password'>;

export type JwtAuthenticatedUser = Pick<AuthenticatedUser, 'id' | 'username'>;

export interface JwtPayload {
  sub: User['id'];
  username: User['username'];
}

export interface LoginResponse {
  access_token: string;
}
