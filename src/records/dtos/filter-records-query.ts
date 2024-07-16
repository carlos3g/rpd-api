import { IsInt, IsOptional, IsString } from 'class-validator';

export class FilterRecordsQuery {
  @IsOptional()
  @IsString()
  public event?: string;

  @IsOptional()
  @IsString()
  public thought?: string;

  @IsOptional()
  @IsString()
  public behavior?: string;

  @IsOptional()
  @IsInt()
  public placeId?: number;

  @IsOptional()
  @IsInt()
  public personId?: number;
}
