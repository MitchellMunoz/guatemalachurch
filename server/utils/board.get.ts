// server/api/board.get.ts
import { $database } from './database';

export default defineEventHandler(async () => {
    const users = await $database.user.findMany();
    const posts = await $database.post.findMany();

    return {
        columns: [
            {
                name: 'Users',
                tasks: users.map((u) => ({
                    id: u.id,
                    name: u.email,
                    description: 'Account',
                })),
            },
            {
                name: 'Posts',
                tasks: posts.map((p) => ({
                    id: p.id,
                    name: p.title,
                    description: p.content,
                })),
            },
        ],
    };
});
