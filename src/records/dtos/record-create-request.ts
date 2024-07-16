import { IsInt, IsOptional, IsString } from 'class-validator';

export class RecordCreateRequest {
  @IsString()
  public event!: string;

  @IsString()
  public thought!: string;

  @IsString()
  public behavior!: string;

  @IsInt()
  @IsOptional()
  public personId?: number;

  @IsInt()
  public placeId!: number;
}
