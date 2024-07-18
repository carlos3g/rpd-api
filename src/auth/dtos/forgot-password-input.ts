import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordInput {
  public constructor(input: ForgotPasswordInput) {
    this.email = input.email;
  }

  @ApiProperty()
  @IsEmail()
  public email: string;
}
