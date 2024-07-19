import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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
  @IsUUID()
  @IsOptional()
  public personUuid?: string;

  @ApiProperty()
  @IsUUID()
  public placeUuid!: string;
}
