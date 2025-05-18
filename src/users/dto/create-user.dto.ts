/* DTO (Data Transfer Object)
 * A DTO is an object that defines how the data will be sent over the network.
 * We could determine the DTO schema by using TypeScript interfaces, or by simple classes.
 * */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  firstName: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  lastName: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  username: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  password: string;
  @ApiPropertyOptional({
    type: Boolean,
    description: 'This is an optional property',
  })
  isActive: boolean;
}
