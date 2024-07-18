import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenInput {
  public constructor(input: RefreshTokenInput) {
    this.refreshToken = input.refreshToken;
  }

  @ApiProperty()
  @IsString()
  public refreshToken: string;
}
