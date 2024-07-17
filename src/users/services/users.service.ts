import type { UsersServiceContract } from '@app/users/contracts/users-service.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService implements UsersServiceContract {}
