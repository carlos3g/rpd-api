export class User {
  public constructor(input: User) {
    Object.assign(this, input);
  }

  public id: number;

  public uuid: string;

  public name: string;

  public email: string;

  public password: string;

  public createdAt: Date;

  public updatedAt: Date;
}
