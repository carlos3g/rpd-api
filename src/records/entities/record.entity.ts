import { Exclude } from 'class-transformer';

export class Record {
  public constructor(input: Record) {
    this.id = input.id;
    this.uuid = input.uuid;
    this.event = input.event;
    this.thought = input.thought;
    this.behavior = input.behavior;
    this.userId = input.userId;
    this.placeId = input.placeId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  @Exclude()
  public id: number;

  public uuid: string;

  public event: string;

  public thought: string;

  public behavior: string;

  public userId: number;

  public placeId: number;

  public createdAt: Date;

  public updatedAt: Date;
}
