import { Match } from '@app/shared/validators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class ResetPasswordInput {
  public constructor(input: ResetPasswordInput) {
    this.email = input.email;
    this.token = input.token;
    this.password = input.password;
    this.passwordConfirmation = input.passwordConfirmation;
  }

  @ApiProperty()
  @IsEmail()
  public email: string;

  public token: string;

  @ApiProperty()
  @MinLength(8)
  public password: string;

  @ApiProperty()
  @MinLength(8)
  @Match('password')
  public passwordConfirmation: string;
}
