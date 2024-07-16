import { IsOptional, IsString } from 'class-validator';

export class PlaceUpdateRequest {
  @IsOptional()
  @IsString()
  public name?: string;
}
