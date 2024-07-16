import { IsInt, IsOptional, IsString } from 'class-validator';

export class RecordUpdateRequest {
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
  public userId?: number;

  @IsOptional()
  @IsInt()
  public placeId?: number;
}
