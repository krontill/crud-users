import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'The id of the User' })
  id: number;

  @Column({ length: 255 })
  @ApiProperty({ example: 'John', description: 'The first name of the User' })
  firstName: string;

  @Column({ length: 255 })
  @ApiProperty({ example: 'Lennon', description: 'The last name of the User' })
  lastName: string;

  @Column({ length: 255 })
  @ApiProperty({ example: 'username', description: 'Username for login' })
  username: string;

  @Column({ length: 255 })
  @ApiProperty({ example: 'password', description: 'Password for login' })
  password: string;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Active status of the User' })
  isActive: boolean;
}
