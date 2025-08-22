<script setup lang="ts">
    import { setPageLayout } from '#app';

    setPageLayout('dashboard-participant');

    useHead({
        title: 'Participant Dashboard',
    });

    const { user } = useAuth();

    type ChecklistItem = { id: string; label: string; done: boolean };
    const checklist = ref<ChecklistItem[]>([
        { id: 'forms', label: 'Complete registration form', done: false },
        { id: 'deposit', label: 'Pay deposit', done: false },
        { id: 'passport', label: 'Upload passport', done: false },
    ]);

    const toggleChecklist = (id: string) => {
        const index = checklist.value.findIndex((i) => i.id === id);
        const item = index !== -1 ? checklist.value[index] : undefined;
        if (item) item.done = !item.done;
    };

    type TripCard = {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        status: 'UPCOMING' | 'CURRENT' | 'PAST';
    };

    const trips = ref<TripCard[]>([]);

    onMounted(() => {
        // Placeholder data until trip endpoints are wired
        trips.value = [
            {
                id: 't1',
                name: 'Guatemala Mission Trip',
                startDate: '2026-03-10',
                endDate: '2026-03-18',
                status: 'UPCOMING',
            },
        ];
    });
</script>

<template>
    <div>
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Welcome, {{ user?.name || 'Participant' }}</h2>
            <p class="text-sm text-gray-500">Here is an overview of your trips and tasks.</p>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <UCard class="md:col-span-2" title="Upcoming Trip">
                <template #default>
                    <div v-if="trips.length">
                        <div v-for="t in trips" :key="t.id" class="mb-3 rounded border p-3 last:mb-0">
                            <div class="flex items-center justify-between">
                                <h3 class="font-medium">{{ t.name }}</h3>
                                <UBadge color="primary" variant="soft">{{ t.status }}</UBadge>
                            </div>
                            <p class="text-sm text-gray-500">{{ t.startDate }} → {{ t.endDate }}</p>
                        </div>
                    </div>
                    <div v-else class="text-sm text-gray-500">No trips yet.</div>
                </template>
            </UCard>

            <UCard title="My Checklist">
                <template #default>
                    <div class="space-y-2">
                        <label v-for="item in checklist" :key="item.id" class="flex items-center gap-2">
                            <UCheckbox :model-value="item.done" @change="() => toggleChecklist(item.id)" />
                            <span :class="item.done ? 'text-gray-400 line-through' : ''">{{ item.label }}</span>
                        </label>
                    </div>
                </template>
            </UCard>
        </div>

        <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <UCard title="Documents">
                <template #default>
                    <div class="flex items-center gap-2">
                        <UButton size="sm" variant="soft">Upload Passport</UButton>
                        <UButton size="sm" variant="soft">Waiver</UButton>
                        <UButton size="sm" variant="soft">Insurance</UButton>
                    </div>
                </template>
            </UCard>

            <UCard title="Resources">
                <template #default>
                    <div class="space-y-2 text-sm">
                        <ULink to="/projects" class="text-primary-500">Project info</ULink>
                        <div>Training videos</div>
                        <div>Packing list</div>
                    </div>
                </template>
            </UCard>

            <UCard title="Support">
                <template #default>
                    <div class="space-y-2 text-sm">
                        <div>Questions? Contact your coordinator.</div>
                        <UButton size="sm" variant="soft">Message Coordinator</UButton>
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>
