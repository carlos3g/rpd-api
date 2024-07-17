import { IsInt, IsOptional } from 'class-validator';

export class Paginate {
  @IsOptional()
  @IsInt()
  public page?: number;

  @IsOptional()
  @IsInt()
  public perPage?: number;
}
