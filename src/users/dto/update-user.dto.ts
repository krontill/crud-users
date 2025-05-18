import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  firstName?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  lastName?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  username?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  password?: string;
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
  })
  isActive?: boolean;
}
