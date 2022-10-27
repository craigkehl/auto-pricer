import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

class BaseContent {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateUserDto extends BaseContent {
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
