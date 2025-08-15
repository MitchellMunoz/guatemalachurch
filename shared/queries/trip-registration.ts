// shared/queries/trip-registration.ts
import { defineMutation, useMutation, useQueryCache } from '@pinia/colada';
import type { Prisma } from '~~/.generated/prisma/client';

// Create Trip
export const useCreateTrip = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.TripsCreateArgs) => {
            return $fetch('/api/model/trip-registration', {
                method: 'POST',
                params: { q: JSON.stringify(data) },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Trips'] }),
    });
});

// Delete Trip
export const useDeleteTrip = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.TripsDeleteArgs) => {
            return $fetch('/api/model/trip-registration', {
                method: 'DELETE',
                params: { q: JSON.stringify(data) },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Trips'] }),
    });
});
