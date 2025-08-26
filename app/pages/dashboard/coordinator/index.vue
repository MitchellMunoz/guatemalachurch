<script setup lang="ts">
    import { useAuth } from '#imports';
    import { useFindManyTrips } from '#shared/queries/trip';

    definePageMeta({ layout: 'dashboard-coordinator', middleware: ['protected', 'role'] });

    useHead({
        title: 'Coordinator Dashboard',
    });

    const { user } = useAuth();
    const { data: tripRows, filters } = useFindManyTrips();
    watchEffect(() => {
        if (user.value?.email) {
            filters.value.where = { createdByEmail: user.value.email };
        }
    });

    type TripCard = {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
        status: 'UPCOMING' | 'CURRENT' | 'PAST';
    };

    const trips = computed<TripCard[]>(() =>
        (tripRows.value ?? []).map((t) => ({
            id: t.id,
            name: t.title,
            startDate: new Date(t.startDate as unknown as string).toISOString().slice(0, 10),
            endDate: new Date(t.endDate as unknown as string).toISOString().slice(0, 10),
            status: 'UPCOMING',
        })),
    );

    // Metrics and planning state (placeholder data)
    const targetParticipants = 20;
    const metrics = reactive({
        registered: 12,
        target: targetParticipants,
        paymentsReceived: 18000,
        paymentsTarget: 30000,
        passportsUploaded: 9,
        waiversSigned: 10,
        tasksOverdue: 2,
        nextDeadline: '2026-01-31',
    });

    const paymentPercent = computed(() =>
        Math.min(100, Math.round((metrics.paymentsReceived / Math.max(1, metrics.paymentsTarget)) * 100)),
    );

    type ItineraryItem = { day: string; title: string; detail: string };
    const itinerary = ref<ItineraryItem[]>([
        { day: 'Day 1', title: 'Arrive in Guatemala City', detail: 'Airport pickup, drive to lodging' },
        { day: 'Day 2', title: 'Orientation + Worksite', detail: 'Morning orientation, afternoon project' },
        { day: 'Day 3', title: 'Ministry + Community', detail: 'VBS, outreach, community visit' },
    ]);

    type ChecklistItem = { id: string; label: string; done: boolean };
    const checklist = ref<ChecklistItem[]>([
        { id: 'flights', label: 'Confirm group flights', done: false },
        { id: 'rooming', label: 'Finalize rooming list', done: false },
        { id: 'waivers', label: 'Collect waivers', done: false },
        { id: 'passports', label: 'Verify passports', done: false },
    ]);

    const toggleChecklist = (id: string) => {
        const index = checklist.value.findIndex((i) => i.id === id);
        const item = index !== -1 ? checklist.value[index] : undefined;
        if (item) item.done = !item.done;
    };

    type Flight = { carrier: string; number: string; depart: string; arrive: string };
    const flights = ref<Flight[]>([
        { carrier: 'AA', number: '123', depart: 'DFW 08:30', arrive: 'GUA 11:15' },
        { carrier: 'AA', number: '456', depart: 'GUA 12:45', arrive: 'DFW 17:20' },
    ]);

    const lodging = ref({ name: 'Guest House', nights: 7, rooms: 6 });
    const transport = ref({ buses: 1, vans: 2, notes: 'Airport pickup + daily commute' });
</script>

<template>
    <div>
        <div class="p-6">
            <div class="mb-6">
                <h2 class="text-xl font-semibold">Welcome, {{ user?.name || 'Coordinator' }}</h2>
                <p class="text-sm text-gray-500">Manage trips, teams, registrations, and expenses.</p>
            </div>

            <!-- Metrics -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                <UCard>
                    <template #header>
                        <div class="text-sm text-gray-500">Participants</div>
                    </template>
                    <div class="text-2xl font-semibold">{{ metrics.registered }} / {{ metrics.target }}</div>
                    <div class="text-xs text-gray-500">Registered / Target</div>
                </UCard>
                <UCard>
                    <template #header>
                        <div class="text-sm text-gray-500">Payments</div>
                    </template>
                    <div class="text-2xl font-semibold">{{ paymentPercent }}%</div>
                    <div class="text-xs text-gray-500">
                        ${{ metrics.paymentsReceived.toLocaleString() }} / ${{
                            metrics.paymentsTarget.toLocaleString()
                        }}
                    </div>
                </UCard>
                <UCard>
                    <template #header>
                        <div class="text-sm text-gray-500">Documents</div>
                    </template>
                    <div class="text-2xl font-semibold">
                        {{ metrics.passportsUploaded }} / {{ metrics.waiversSigned }}
                    </div>
                    <div class="text-xs text-gray-500">Passports / Waivers</div>
                </UCard>
                <UCard>
                    <template #header>
                        <div class="text-sm text-gray-500">Deadlines</div>
                    </template>
                    <div class="text-2xl font-semibold">{{ metrics.tasksOverdue }}</div>
                    <div class="text-xs text-gray-500">Overdue • Next: {{ metrics.nextDeadline }}</div>
                </UCard>
            </div>

            <!-- Upcoming Trips & Teams -->
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <UCard class="md:col-span-2" title="Upcoming Trips">
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

                        <div class="mt-4 flex items-center gap-2">
                            <UButton size="sm" @click="navigateTo('/dashboard/coordinator/church-registration')">
                                Register Trip
                            </UButton>
                            <UButton size="sm" variant="soft" @click="navigateTo('/dashboard/manage/trips')">
                                Manage Trips
                            </UButton>
                        </div>
                    </template>
                </UCard>

                <UCard title="Teams">
                    <template #default>
                        <div class="space-y-2 text-sm">
                            <p class="text-gray-500">Create and manage teams for upcoming trips.</p>
                            <UButton size="sm" variant="soft" @click="navigateTo('/dashboard/manage/teams')">
                                Manage Teams
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Itinerary & Tasks + Expenses -->
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <UCard class="md:col-span-2" title="Itinerary & Tasks">
                    <template #default>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <h3 class="mb-2 font-medium">Schedule</h3>
                                <ul class="space-y-2 text-sm">
                                    <li v-for="i in itinerary" :key="i.day" class="rounded border p-2">
                                        <div class="flex items-center justify-between">
                                            <span class="font-medium">{{ i.day }}</span>
                                            <span class="text-gray-500">{{ i.title }}</span>
                                        </div>
                                        <div class="text-gray-500">{{ i.detail }}</div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="mb-2 font-medium">Checklist</h3>
                                <div class="space-y-2 text-sm">
                                    <label v-for="item in checklist" :key="item.id" class="flex items-center gap-2">
                                        <UCheckbox :model-value="item.done" @change="() => toggleChecklist(item.id)" />
                                        <span :class="item.done ? 'text-gray-400 line-through' : ''">{{
                                            item.label
                                        }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </template>
                </UCard>

                <UCard title="Expenses">
                    <template #default>
                        <div class="space-y-2 text-sm">
                            <p class="text-gray-500">Track and review trip-related expenses.</p>
                            <UButton size="sm" variant="soft" @click="navigateTo('/dashboard/manage/expenses')">
                                Manage Expenses
                            </UButton>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Logistics + Resources -->
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <UCard class="md:col-span-2" title="Logistics">
                    <template #default>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <h3 class="mb-2 font-medium">Flights</h3>
                                <ul class="space-y-2 text-sm">
                                    <li v-for="f in flights" :key="f.number" class="rounded border p-2">
                                        <div class="font-medium">{{ f.carrier }} {{ f.number }}</div>
                                        <div class="text-gray-500">{{ f.depart }} → {{ f.arrive }}</div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 class="mb-2 font-medium">Transport</h3>
                                <div class="rounded border p-2 text-sm">
                                    <div>Buses: {{ transport.buses }}</div>
                                    <div>Vans: {{ transport.vans }}</div>
                                    <div class="text-gray-500">{{ transport.notes }}</div>
                                </div>
                            </div>
                            <div>
                                <h3 class="mb-2 font-medium">Lodging</h3>
                                <div class="rounded border p-2 text-sm">
                                    <div>{{ lodging.name }}</div>
                                    <div>Nights: {{ lodging.nights }}</div>
                                    <div>Rooms: {{ lodging.rooms }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </UCard>

                <UCard title="Resources">
                    <template #default>
                        <div class="space-y-2 text-sm">
                            <ULink to="/projects" class="text-primary-500">Project info</ULink>
                            <div>Training resources</div>
                            <div>Coordinator checklist</div>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Budget & Documents -->
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <UCard class="md:col-span-2" title="Budget & Payments">
                    <template #default>
                        <div class="space-y-2 text-sm">
                            <div class="font-medium">Progress: {{ paymentPercent }}%</div>
                            <div class="text-gray-500">
                                ${{ metrics.paymentsReceived.toLocaleString() }} of ${{
                                    metrics.paymentsTarget.toLocaleString()
                                }}
                                received
                            </div>
                            <div class="mt-2 flex items-center gap-2">
                                <UButton size="sm" variant="soft">View Payments</UButton>
                                <UButton size="sm" variant="soft">Add Expense</UButton>
                            </div>
                        </div>
                    </template>
                </UCard>

                <UCard title="Documents">
                    <template #default>
                        <div class="space-y-2 text-sm">
                            <div>Passports uploaded: {{ metrics.passportsUploaded }}</div>
                            <div>Waivers signed: {{ metrics.waiversSigned }}</div>
                            <UButton size="sm" variant="soft">Manage Documents</UButton>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Comms, Safety, On-trip tools -->
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <UCard title="Communications">
                    <template #default>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <UButton size="sm" variant="soft">Send Announcement</UButton>
                            <UButton size="sm" variant="soft">Message Chaperones</UButton>
                            <UButton size="sm" variant="soft" @click="navigateTo('/contact')">Contact Partner</UButton>
                        </div>
                    </template>
                </UCard>

                <UCard title="Safety & Compliance">
                    <template #default>
                        <div class="space-y-2 text-sm">
                            <div>Emergency: 110 / 120</div>
                            <div>US Embassy Guatemala: +502 2326-4000</div>
                            <UButton size="sm" variant="soft">View Safety Plan</UButton>
                        </div>
                    </template>
                </UCard>

                <UCard title="On-trip Tools">
                    <template #default>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <UButton size="sm" variant="soft">Start Headcount</UButton>
                            <UButton size="sm" variant="soft">Open Check-In</UButton>
                        </div>
                    </template>
                </UCard>
            </div>

            <!-- Reporting -->
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <UCard title="Reporting">
                    <template #default>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <UButton size="sm" variant="soft">Create Survey</UButton>
                            <UButton size="sm" variant="soft">Upload Media</UButton>
                            <UButton size="sm" variant="soft">Reconcile Budget</UButton>
                        </div>
                    </template>
                </UCard>
            </div>
        </div>
    </div>
</template>
