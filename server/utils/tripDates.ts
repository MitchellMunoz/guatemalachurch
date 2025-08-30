type TripDateData =
  | {
      startDate: string;
      endDate: string;
    };

/** Safe parse for ?q=... */
/** Safe parse for ?q=... */
export function parseTripQuery(tripQueryJson: string) {
  try {
    return JSON.parse(tripQueryJson);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid JSON in query parameter "q"',
    });
  }
}

/** Truncate a Date to local midnight (same logic you had, just DRY) */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function validateTripDates(data: TripDateData) {
  if (!data) return;

  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  if (data.startDate) {
    const start = startOfDay(new Date(data.startDate));
    if (start < yesterday) {
      throw createError({ statusCode: 400, statusMessage: 'Start date cannot be in the past' });
    }
  }

  if (data.endDate && data.startDate) {
    const startDay = startOfDay(new Date(data.startDate));
    const endDay = startOfDay(new Date(data.endDate));
    if (endDay < startDay) {
      throw createError({ statusCode: 400, statusMessage: 'End date cannot be before start date' });
    }
  }
}