import { PrismaClient } from '~~/.generated/prisma/client';

const base = new PrismaClient({ log: import.meta.dev ? ['info'] : [] });

export const $database = base.$extends({
    query: {
        user: {
            async create({ args, query }) {
                const data = args.data as { name?: string; firstName?: string | null; lastName?: string | null };
                if (data?.name && (data.firstName === null || data.lastName === null)) {
                    const [first, ...rest] = data.name.trim().split(' ');
                    data.firstName ??= first || null;
                    data.lastName ??= rest.join(' ') || null;
                }
                return query(args);
            },
        },
    },
});
