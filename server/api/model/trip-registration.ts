import z from 'zod';

const QuerySchema = z.object({ op: z.enum(['findMany', 'findUnique']).optional(), q: z.string() });

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, QuerySchema.parse);
    const parsedQuery = JSON.parse(query.q);

    switch (event.method) {
        case 'POST':
            await assertTripAllowsRegistration(parsedQuery);
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

type TripRegistrationCreateArgs = {
    data?: {
        trip?: { connect?: { id?: string; code?: string } };
    };
};

async function assertTripAllowsRegistration(parsedQuery: TripRegistrationCreateArgs) {
    const connect = parsedQuery?.data?.trip?.connect;
    if (!connect) return;

    let trip: { startDate: Date | string } | null = null;
    if (connect.id) {
        trip = await $database.trip.findUnique({ where: { id: connect.id }, select: { startDate: true } });
    } else if (connect.code) {
        trip = await $database.trip.findUnique({ where: { code: connect.code }, select: { startDate: true } });
    }
    if (!trip) return;

    const start = new Date(trip.startDate);
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    if (startDay < yesterday) {
        throw createError({ statusCode: 400, statusMessage: 'This trip has already started. Registration is closed.' });
    }
}
