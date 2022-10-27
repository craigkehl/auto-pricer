import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

class BaseContent {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password?: string;
}

export class UpdateUserDto extends BaseContent {
  @MinLength(8)
  @MaxLength(30)
  @IsOptional()
  password: string;
}
