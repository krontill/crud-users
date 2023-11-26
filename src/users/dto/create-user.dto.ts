/* DTO (Data Transfer Object)
 * A DTO is an object that defines how the data will be sent over the network.
 * We could determine the DTO schema by using TypeScript interfaces, or by simple classes.
 * */

export class CreateUserDto {
  firstName: string;
  lastName: string;
  isActive: boolean;
}
