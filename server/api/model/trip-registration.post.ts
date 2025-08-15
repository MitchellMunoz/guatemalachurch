import z from 'zod';

const QuerySchema = z.object({ q: z.string() });

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, QuerySchema.parse);
    const parsedQuery = JSON.parse(query.q);

    return await $database.trips.create(parsedQuery);
    // switch (event.method) {
    //     case 'POST':
    //         return await $database.trips.create(parsedQuery);
    //     case 'DELETE':
    //         return await $database.trips.delete(parsedQuery);
    //     default:
    //         throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
    // }
});
