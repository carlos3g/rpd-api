import { Exclude } from 'class-transformer';

export class User {
  public constructor(input: User) {
    this.id = input.id;
    this.uuid = input.uuid;
    this.name = input.name;
    this.email = input.email;
    this.password = input.password;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  @Exclude()
  public id: number;

  public uuid: string;

  public name: string;

  public email: string;

  public password: string;

  public createdAt: Date;

  public updatedAt: Date;
}
