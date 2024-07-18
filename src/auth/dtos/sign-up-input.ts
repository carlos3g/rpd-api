import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpInput {
  public constructor(input: SignUpInput) {
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.birthDate = input.birthDate;
  }

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty({ minLength: 8 })
  @MinLength(8)
  public password: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  public birthDate: Date;
}
