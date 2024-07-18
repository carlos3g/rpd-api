import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsInt()
  public userId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  public placeId?: number;
}
