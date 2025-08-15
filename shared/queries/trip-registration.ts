// shared/queries/trip-registration.ts
import { defineMutation, useMutation, useQueryCache } from '@pinia/colada';
import type { Prisma } from '~~/.generated/prisma/client';

// Create Registration
export const useCreateRegistration = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.RegistrationCreateArgs) => {
            return $fetch('/api/model/trip-registration', {
                method: 'POST',
                params: { q: JSON.stringify(data) },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Registration'] }),
    });
});

// Delete Registration
export const useDeleteRegistration = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.RegistrationDeleteArgs) => {
            return $fetch('/api/model/trip-registration', {
                method: 'DELETE',
                params: { q: JSON.stringify(data) },
            });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Registration'] }),
    });
});
