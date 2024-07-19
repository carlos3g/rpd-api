import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RecordUpdateRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public event?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public thought?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public behavior?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public placeUuid?: number;
}
