import { IsNumber } from 'class-validator';

export class FindUser {
  @IsNumber()
  id: number;
}
