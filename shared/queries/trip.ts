import { defineMutation, defineQuery, useMutation, useQuery, useQueryCache } from '@pinia/colada';
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth'; // Adjust the import path as needed
import type { Prisma } from '~~/.generated/prisma/client';

export const useCreateTrip = defineMutation(() => {
    const queryCache = useQueryCache();
    const { user } = useAuth(); // Assumes useAuth provides the current user

    return useMutation({
        mutation: (data: Prisma.TripCreateArgs) => {
            // Add createdBy to the data if not already set
            const tripData = {
                ...data,
                data: {
                    ...data.data,
                    createdBy: user.value?.id, // Assumes user object has an id property
                    createdByEmail: user.value?.email, // Assumes user object has an email property
                },
            };
            console.log('XXXXX tripData:', tripData);
            return $fetch('/api/model/trip', { method: 'POST', params: { q: JSON.stringify(tripData) } });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['Trip'] }),
    });
});
export const useFindManyTrips = (defaultFilters?: Prisma.TripFindManyArgs) =>
    defineQuery(() => {
        const filters = ref<Prisma.TripFindManyArgs>(defaultFilters || {});

        const query = useQuery<Prisma.TripGetPayload<Prisma.TripFindManyArgs>[]>({
            key: () => ['Trip', 'findMany', JSON.stringify(filters.value)],
            query: () =>
                $fetch<Prisma.TripGetPayload<Prisma.TripFindManyArgs>[]>('/api/model/trip', {
                    method: 'GET',
                    params: { op: 'findMany', q: JSON.stringify(filters.value) },
                }),
        });

        return { ...query, filters };
    })();
