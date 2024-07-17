import { Exclude } from 'class-transformer';

export class User {
  public constructor(input: User) {
    Object.assign(this, input);
  }

  @Exclude()
  public id!: number;

  public uuid!: string;

  public name!: string;

  public email!: string;

  public birthDate!: Date;

  public password!: string;

  public createdAt!: Date;

  public updatedAt!: Date;
}
