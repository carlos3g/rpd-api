export class PasswordChangeRequest {
  public constructor(input: PasswordChangeRequest) {
    this.token = input.token;
    this.userId = input.userId;
    this.createdAt = input.createdAt;
  }

  public token: string;

  public userId: number;

  public createdAt: Date;
}
