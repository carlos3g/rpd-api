import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, Length } from 'class-validator';

export class SignUpInput {
  public constructor(input: SignUpInput) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.birthDate = input.birthDate;
  }

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
