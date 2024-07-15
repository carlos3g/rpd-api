import { IsEmail, Length } from 'class-validator';

export class SignInInput {
  public constructor(input: SignInInput) {
    this.email = input.email;
    this.password = input.password;
  }

  @IsEmail()
  public email: string;

  @Length(8)
  public password: string;
}
