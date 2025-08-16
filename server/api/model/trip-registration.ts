import z from 'zod';

const QuerySchema = z.object({ q: z.string() });

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, QuerySchema.parse);
    const parsedQuery = JSON.parse(query.q);

    switch (event.method) {
        case 'POST':
            return await $database.tripRegistration.create(parsedQuery);
        case 'DELETE':
            return await $database.tripRegistration.delete(parsedQuery);
        default:
            throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
    }
});
