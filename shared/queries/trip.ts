import { defineMutation, defineQuery, useMutation, useQuery, useQueryCache } from '@pinia/colada';
import type { Prisma } from '~~/.generated/prisma/client';

export const useCreateTrip = defineMutation(() => {
    const queryCache = useQueryCache();

    return useMutation({
        mutation: (data: Prisma.TripCreateArgs) =>
            $fetch('/api/model/trip', { method: 'POST', params: { q: JSON.stringify(data) } }),
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


