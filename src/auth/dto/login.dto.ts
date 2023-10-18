import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}

export default LoginUserDto;
