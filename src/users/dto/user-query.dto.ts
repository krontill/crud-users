import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserQueryDto {
  @ApiPropertyOptional({
    type: Number,
    default: 1,
    minimum: 1,
    description: 'One-based page number',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @ApiPropertyOptional({
    type: Number,
    default: 10,
    minimum: 1,
    maximum: 100,
    description: 'Number of users returned per page',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit = 10;
}
