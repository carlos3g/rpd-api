import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, Length } from 'class-validator';

export class SignUpInput {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @Length(8)
  public password: string;

  @IsDate()
  @Type(() => Date)
  public birthDate: Date;
}
