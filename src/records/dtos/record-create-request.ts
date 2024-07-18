import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class RecordCreateRequest {
  @ApiProperty()
  @IsString()
  public event!: string;

  @ApiProperty()
  @IsString()
  public thought!: string;

  @ApiProperty()
  @IsString()
  public behavior!: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  public personId?: number;

  @ApiProperty()
  @IsInt()
  public placeId!: number;
}
