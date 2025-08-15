// shared/queries/trip-registration.ts
import { defineMutation, useMutation, useQueryCache } from '@pinia/colada';
import type { Prisma } from '~~/.generated/prisma/client';

// Create Trip
export const useCreateRegistration = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.TripRegistrationCreateArgs) => {
            return $fetch('/api/model/trip-registration', {
                method: 'POST',
                params: { q: JSON.stringify(data) },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['TripRegistrations'] }),
    });
});

// Delete Trip obviously doesnt work because api file requests to .post.ts
export const useDeleteRegistration = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.TripRegistrationDeleteArgs) => {
            return $fetch('/api/model/trip-registration', {
                method: 'DELETE',
                params: { q: JSON.stringify(data) },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['TripRegistrations'] }),
    });
});
