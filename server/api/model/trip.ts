import z from 'zod';
import { validateTripDates, parseTripQuery } from '../../utils/tripDates'


const QuerySchema = z.object({
  op: z.enum(['findMany', 'findUnique']).optional(),
  q: z.string(),
});


export default defineEventHandler(async (event) => {
  // Validate we at least have the expected query shape
  const query = await getValidatedQuery(event, QuerySchema.parse);
  const method = event.method.toUpperCase();

  // Parse ?q=... once, with a clean error if it's malformed
  const parsedQuery = parseTripQuery(query.q);

  switch (method) {
    case 'POST': {
      validateTripDates(parsedQuery?.data);
      return $database.trip.create(parsedQuery);
    }
    case 'PUT':
    case 'PATCH': {
      validateTripDates(parsedQuery?.data);
      return $database.trip.update(parsedQuery);
    }
    case 'DELETE': {
      return $database.trip.delete(parsedQuery);
    }
    case 'GET': {
      if (query.op === 'findMany') return $database.trip.findMany(parsedQuery);
      if (query.op === 'findUnique') return $database.trip.findUnique(parsedQuery);
      throw createError({ statusCode: 400, statusMessage: 'Invalid operation' });
    }
    default:
      throw createError({ statusCode: 405, statusMessage: 'Method not allowed' });
  }
});
