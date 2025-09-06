<script setup lang="ts">
    import { useAuth } from '#imports';
    import { useFindManyTrips, useUpdateTrip } from '#shared/queries/trip';
    import { format, parse } from 'date-fns';
    import type { Prisma } from '~~/.generated/prisma/client';

    definePageMeta({ layout: 'brochure', middleware: ['protected', 'role'] });
    useHead({ title: 'My Trip' });

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
        start: string;
        end: string;
        groupSize: number;
    };

    type TripRow = {
        title: string;
        code?: string | null;
        location?: string | null;
        startDate: string;
        endDate: string;
        groupSize: number | null;
    };

    function toDate(input: string | Date): string {
        const d = new Date(input);
        // Anchor to noon UTC to avoid timezone backshift showing previous day
        const middayUTC = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12, 0, 0, 0));
        return format(middayUTC, 'MMM dd, yyyy');
    }

    function build_trips(data: TripRow[] | undefined): Row[] {
        const rows: Row[] = [];
        for (const t of data || []) {
            const title = t.title || '';
            const code = t.code || '';
            const location = t.location || '';
            const start = toDate(t.startDate);
            const end = toDate(t.endDate);
            const groupSize = t.groupSize || 0;
            rows.push({ title, code, location, start, end, groupSize });
        }
        return rows;
    }
    function get_trips(): Row[] {
        return build_trips(data.value);
    }
    const trips = computed(get_trips);

    function copyCode(code: string) {
        if (code) navigator.clipboard.writeText(code);
    }

    const { mutateAsync: updateTrip } = useUpdateTrip();

    async function onTitleCommit(row: Row, newTitle: string) {
        const trimmed = (newTitle || '').trim();
        if (!row.code || !trimmed) return;
        await updateTrip({ where: { code: row.code }, data: { title: trimmed } });
    }

    function toNoonUTCFromDisplay(display: string): Date | null {
        // display is like 'MMM dd, yyyy'
        const parsed = parse(display, 'MMM dd, yyyy', new Date());
        if (isNaN(parsed.getTime())) return null;
        return new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12, 0, 0, 0));
    }

    async function onStartCommit(row: Row, newVal: string) {
        if (!row.code) return;
        const parsed = toNoonUTCFromDisplay(newVal);
        if (!parsed) return;
        // Prevent past dates on inline edits (tolerate TZ by using yesterday)
        const today = new Date();
        const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
        const parsedDay = new Date(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate());
        if (parsedDay < yesterday) return;
        // Save as ISO date string ("YYYY-MM-DD")
        const isoString = parsed.toISOString().slice(0, 10);
        await updateTrip({ where: { code: row.code }, data: { startDate: isoString } });
    }

    async function onEndCommit(row: Row, newVal: string) {
        if (!row.code) return;
        const parsed = toNoonUTCFromDisplay(newVal);
        if (!parsed) return;
        // Prevent end before start inline
        const currentStart = parse(row.start, 'MMM dd, yyyy', new Date());
        const startDay = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate());
        const endDay = new Date(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate());
        if (endDay < startDay) return;
        // Save as ISO date string ("YYYY-MM-DD")
        const isoString = parsed.toISOString().slice(0, 10);
        await updateTrip({ where: { code: row.code }, data: { endDate: isoString } });
    }

    async function onGroupSizeCommit(row: Row, newVal: string) {
        if (!row.code) return;
        const n = Number((newVal || '').trim());
        if (!Number.isFinite(n) || n < 1) return;
        await updateTrip({ where: { code: row.code }, data: { groupSize: Math.floor(n) } });
    }
</script>

<template>YOU MADE IT TO THE TRIP PAGE</template>
