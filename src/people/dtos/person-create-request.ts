import { IsString } from 'class-validator';

export class PersonCreateRequest {
  @IsString()
  public name!: string;
}
