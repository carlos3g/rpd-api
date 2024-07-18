import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PersonCreateRequest {
  @ApiProperty()
  @IsString()
  public name!: string;
}
