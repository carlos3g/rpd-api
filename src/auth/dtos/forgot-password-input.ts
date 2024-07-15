import { IsEmail } from 'class-validator';

export class ForgotPasswordInput {
  public constructor(input: ForgotPasswordInput) {
    this.email = input.email;
  }

  @IsEmail()
  public email: string;
}
