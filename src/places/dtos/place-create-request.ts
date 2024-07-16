import { IsString } from 'class-validator';

export class PlaceCreateRequest {
  @IsString()
  public name!: string;
}
