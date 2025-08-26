import { defineMutation, defineQuery, useMutation, useQuery, useQueryCache } from '@pinia/colada';
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth'; // Adjust the import path as needed
import type { Prisma } from '~~/.generated/prisma/client';

type CreateTripFormData = {
    title: string;
    churchName?: string;
    location?: string;
    startDate: Date;
    endDate: Date;
    groupSize?: number | null;
    description?: string | null;
    tripId: string;
};

export const useCreateTrip = defineMutation(() => {
    const queryCache = useQueryCache();
    const { user } = useAuth();

    return useMutation({
        // Accept UI payload; we'll inject auth-related fields
        mutation: (args: { data: CreateTripFormData }) => {
            const createdByEmail = user.value?.email;
            const role = user.value?.role || 'PARTICIPANT';

            const dataToSend = {
                ...args.data,
                createdByRole: role,
                createdBy: { connect: { email: createdByEmail } },
            };

            return $fetch('/api/model/trip', {
                method: 'POST',
                params: { q: JSON.stringify({ data: dataToSend }) },
            });
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
