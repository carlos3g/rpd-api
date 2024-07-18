import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PersonUpdateRequest {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  public name?: string;
}
