import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export default SignUpDto;
