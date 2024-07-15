import { IsString } from 'class-validator';

export class RefreshTokenInput {
  public constructor(input: RefreshTokenInput) {
    this.refreshToken = input.refreshToken;
  }

  @IsString()
  public refreshToken: string;
}
