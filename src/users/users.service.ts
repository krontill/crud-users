import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserQueryDto } from './dto/user-query.dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async hashString(str: string): Promise<string> {
    const saltRounds = 10; // Define the cost factor for hashing
    return await bcrypt.hash(str, saltRounds);
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const hash = await this.hashString(createUserDto.password);
    Logger.log(`Save hash, not password: ${hash}`);
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;
    user.password = hash;
    user.isActive = true;

    return this.usersRepository.save(user);
  }

  async findAll(query: UserQueryDto): Promise<PaginatedUsersDto> {
    const { page, limit } = query;
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .orderBy('user.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total, page, limit };
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(+id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
