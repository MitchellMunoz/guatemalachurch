import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const client = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter($database, { provider: "sqlite" }),
});

export const $auth = client;
