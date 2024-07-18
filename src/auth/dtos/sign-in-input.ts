import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class SignInInput {
  public constructor(input: SignInInput) {
    Object.assign(this, input);
  }

  @ApiProperty()
  @IsEmail()
  public email!: string;

  @ApiProperty()
  @Length(8)
  public password!: string;
}
