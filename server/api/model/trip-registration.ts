import z from 'zod';

const QuerySchema = z.object({ op: z.enum(['findMany', 'findUnique']).optional(), q: z.string() });

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, QuerySchema.parse);
    const parsedQuery = JSON.parse(query.q);

    switch (event.method) {
        case 'POST':
            return await $database.tripRegistration.create(parsedQuery);
        case 'DELETE':
            return await $database.tripRegistration.delete(parsedQuery);
        case 'GET':
            switch (query.op) {
                case 'findMany':
                    return await $database.tripRegistration.findMany(parsedQuery);
                case 'findUnique':
                    return await $database.tripRegistration.findUnique(parsedQuery);
                default:
                    throw createError({ statusCode: 400, statusMessage: 'Invalid operation' });
            }
        default:
            throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
    }
});
