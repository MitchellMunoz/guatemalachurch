import { PrismaClient } from "~~/.generated/prisma/client";

const client = new PrismaClient({
  log: import.meta.dev ? ["info"] : [],
});

export const $database = client;
