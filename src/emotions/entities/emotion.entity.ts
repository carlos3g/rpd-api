import { Exclude } from 'class-transformer';

export class Emotion {
  public constructor(input: Emotion) {
    this.id = input.id;
    this.uuid = input.uuid;
    this.name = input.name;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  @Exclude()
  public id: number;

  public uuid: string;

  public name: string;

  public createdAt: Date;

  public updatedAt: Date;
}
