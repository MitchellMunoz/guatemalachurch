<script setup lang="ts">
    import { useAuth } from '#imports';
    import { useFindManyTrips } from '#shared/queries/trip';
    import { format } from 'date-fns';
    import type { Prisma } from '~~/.generated/prisma/client';

    definePageMeta({ layout: 'dashboard-coordinator', middleware: ['protected', 'role'] });
    useHead({ title: 'Manage Trips' });

    const { user } = useAuth();
    const { data, filters, isLoading } = useFindManyTrips();

    const searchLocation = ref('');
    const searchTitle = ref('');

    watchEffect(() => {
        const tripFilter: Prisma.TripWhereInput = {};
        if (user.value?.email) {
            tripFilter.createdByEmail = user.value.email;
        }
        if (searchTitle.value) {
            tripFilter.OR = [
                { title: { contains: searchTitle.value } },
                { churchName: { contains: searchTitle.value } },
            ];
        }
        if (searchLocation.value) {
            tripFilter.location = { contains: searchLocation.value };
        }
        filters.value.where = tripFilter;
        filters.value.orderBy = [{ startDate: 'desc' }];
    });

    type Row = {
        title: string;
        code: string;
        location: string;
        dates: string;
    };

    type TripRow = {
        title: string;
        code?: string | null;
        location?: string | null;
        startDate: string | Date;
        endDate: string | Date;
    };

    function toDate(input: string | Date): string {
        const d = new Date(input);
        return format(d, 'MMM dd, yyyy');
    }

    function build_trips(data: TripRow[] | undefined): Row[] {
        const rows: Row[] = [];
        for (const t of data || []) {
            const title = t.title || '';
            const code = t.code || '';
            const location = t.location || '';
            const start = toDate(t.startDate);
            const end = toDate(t.endDate);
            const dates = `${start} → ${end}`;
            const row: Row = { title, code, location, dates };
            rows.push(row);
        }
        return rows;
    }
    function get_trips(): Row[] {
        return build_trips(data.value);
    }
    const trips = computed(get_trips);

    function copyCode(code: string) {
        if (code) {
            navigator.clipboard.writeText(code);
        }
    }
</script>

<template>
    <div class="p-6">
        <UCard title="Manage Trips">
            <template #header>
                <div class="flex items-center justify-between gap-3">
                    <div class="text-lg font-medium">Manage Trips</div>
                    <UButton size="sm" @click="navigateTo('/dashboard/coordinator/church-registration')"
                        >Create Trip</UButton
                    >
                </div>
            </template>

            <div class="mb-4 flex flex-wrap items-center gap-3">
                <UInput v-model="searchTitle" placeholder="Search title or church" class="w-full max-w-sm" />
                <UInput v-model="searchLocation" placeholder="Location" class="w-full max-w-xs" />
            </div>

            <div v-if="isLoading" class="text-sm text-gray-500">Loading...</div>
            <div v-else>
                <div v-if="trips.length" class="overflow-x-auto">
                    <table class="min-w-full text-left text-sm">
                        <thead>
                            <tr class="border-b">
                                <th class="px-3 py-2">Title</th>
                                <th class="px-3 py-2">Code</th>
                                <th class="px-3 py-2">Location</th>
                                <th class="px-3 py-2">Dates</th>
                                <th class="px-3 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="t in trips" :key="t.code" class="border-b last:border-0">
                                <td class="px-3 py-2">{{ t.title }}</td>
                                <td class="px-3 py-2">
                                    <span v-if="t.code">{{ t.code }}</span>
                                    <span v-else class="text-gray-400">—</span>
                                </td>
                                <td class="px-3 py-2">{{ t.location || '—' }}</td>
                                <td class="px-3 py-2">{{ t.dates }}</td>
                                <td class="px-3 py-2">
                                    <div class="flex items-center gap-2">
                                        <UButton size="xs" variant="soft" :disabled="!t.code" @click="copyCode(t.code)"
                                            >Copy Code</UButton
                                        >
                                        <UButton
                                            size="xs"
                                            variant="soft"
                                            @click="navigateTo(`/dashboard/trips/${t.code}`)"
                                            >View</UButton
                                        >
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="text-sm text-gray-500">No trips found.</div>
            </div>
        </UCard>
    </div>
</template>
