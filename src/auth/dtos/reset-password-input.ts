import { Match } from '@app/shared/validators';
import { IsEmail, Length } from 'class-validator';

export class ResetPasswordInput {
  @IsEmail()
  public email: string;

  public token: string;

  @Length(8)
  public password: string;

  @Length(8)
  @Match('password')
  public passwordConfirmation: string;
}
