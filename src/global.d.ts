import type { User } from '@app/users/entities/user.entity';

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string;
    readonly DEBUG: string;

    readonly API_PORT: string;
    readonly JWT_SECRET: string;

    readonly DB_HOST: string;
    readonly DB_PORT: string;
    readonly DB_DATABASE: string;
    readonly DB_USERNAME: string;
    readonly DB_PASSWORD: string;
    readonly DB_SCHEMA: string;
    readonly DB_URL: string;
  }
}

declare global {
  // see: https://github.com/blitz-js/blitz/blob/3b10b13e6b7d5273fc724286da43887e4b526787/packages/blitz/src/global.ts
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, vars-on-top, no-var
  var _secret_prismaClient: any;

  declare namespace Express {
    interface Request {
      user?: User;
    }
  }
}
