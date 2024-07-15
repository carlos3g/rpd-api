import { Match } from '@app/shared/validators';
import { IsEmail, Length } from 'class-validator';

export class ResetPasswordInput {
  public constructor(input: ResetPasswordInput) {
    this.email = input.email;
    this.token = input.token;
    this.password = input.password;
    this.passwordConfirmation = input.passwordConfirmation;
  }

  @IsEmail()
  public email: string;

  public token: string;

  @Length(8)
  public password: string;

  @Length(8)
  @Match('password')
  public passwordConfirmation: string;
}
