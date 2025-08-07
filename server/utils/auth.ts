import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import type { H3Event } from "h3";

const client = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter($database, { provider: "sqlite" }),
});

export const $auth = () => {
  /**
   * This function is used to require authentication for a given event.
   * @param event - The event to require authentication for.
   * @returns The session if the user is authenticated, otherwise it throws an error.
   */
  const requireAuth = async (event: H3Event) => {
    const session = await client.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Unauthorized",
      });
    }

    return session;
  };

  return {
    requireAuth,
    client,
  };
};
