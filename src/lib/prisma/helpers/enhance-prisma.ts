/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-underscore-dangle */
// see: https://github.com/blitz-js/blitz/blob/canary/nextjs/packages/next/stdlib/prisma-utils.ts
// see: https://github.com/prisma/prisma/issues/5230
import { spawn } from 'cross-spawn';
import which from 'npm-which';

interface Constructor<T = unknown> {
  new (...args: never[]): T;
}

interface EnhancedPrismaClientAddedMethods {
  $reset: () => Promise<void>;
}

interface EnhancedPrismaClientConstructor<TPrismaClientCtor extends Constructor> {
  new (
    ...args: ConstructorParameters<TPrismaClientCtor>
  ): InstanceType<TPrismaClientCtor> & EnhancedPrismaClientAddedMethods;
}

export const enhancePrisma = <TPrismaClientCtor extends Constructor>(
  client: TPrismaClientCtor
): EnhancedPrismaClientConstructor<TPrismaClientCtor> => {
  return new Proxy(client as EnhancedPrismaClientConstructor<TPrismaClientCtor>, {
    construct(target, args) {
      if (typeof window !== 'undefined' && process.env.JEST_WORKER_ID === undefined) {
        // Return object with $use method if in the browser
        // Skip in Jest tests because window is defined in Jest tests
        return { $use: () => {} };
      }

      if (!global._secret_prismaClient) {
        // eslint-disable-next-line no-shadow, new-cap, @typescript-eslint/no-unsafe-argument
        const clientInstance = new target(...(args as any));

        clientInstance.$reset = async function reset() {
          if (process.env.NODE_ENV === 'production') {
            throw new Error(
              "You are calling db.$reset() in a production environment. We think you probably didn't mean to do that, so we are throwing this error instead of destroying your life's work."
            );
          }
          const prismaBin = which(process.cwd()).sync('prisma');
          await new Promise((res, rej) => {
            const process = spawn(prismaBin, ['migrate', 'reset', '--force', '--skip-generate'], {
              stdio: 'ignore',
            });
            process.on('exit', (code) => (code === 0 ? res(0) : rej(code)));
          });
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          global._secret_prismaClient.$disconnect();
        };

        global._secret_prismaClient = clientInstance;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return global._secret_prismaClient;
    },
  });
};
