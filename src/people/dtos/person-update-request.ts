import { IsOptional, IsString } from 'class-validator';

export class PersonUpdateRequest {
  @IsOptional()
  @IsString()
  public name?: string;
}
