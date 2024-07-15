import { Exclude } from 'class-transformer';

export class Person {
  public constructor(input: Person) {
    this.id = input.id;
    this.uuid = input.uuid;
    this.name = input.name;
    this.userId = input.userId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  @Exclude()
  public id: number;

  public uuid: string;

  public name: string;

  public userId: number;

  public createdAt: Date;

  public updatedAt: Date;
}
