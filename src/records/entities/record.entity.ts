import { Exclude } from 'class-transformer';

export class Record {
  public constructor(input: Record) {
    Object.assign(this, input);
  }

  @Exclude()
  public id!: number;

  public uuid!: string;

  public event!: string;

  public thought!: string;

  public behavior!: string;

  @Exclude()
  public userId!: number;

  @Exclude()
  public placeId!: number;

  public createdAt!: Date;

  public updatedAt!: Date;
}
