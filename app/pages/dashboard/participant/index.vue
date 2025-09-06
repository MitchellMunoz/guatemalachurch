<script setup lang="ts">
    definePageMeta({ layout: 'dashboard-participant', middleware: ['protected', 'role'] });

    useHead({
        title: 'Participant Dashboard',
    });

    const { user } = useAuth();
    const { confirmNavigate } = useDialog();

    type ChecklistItem = { id: string; label: string; done: boolean };
    const checklist = ref<ChecklistItem[]>([
        { id: 'forms', label: 'Complete registration form', done: false },
        { id: 'deposit', label: 'Pay deposit', done: false },
        { id: 'passport', label: 'Has valid passport', done: false },
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

    const passportExpiration = ref('');
    const passportCountry = ref('');

    const hasAllergies = ref(false);
    const allergyDetails = ref('');
    const takesMedications = ref(false);
    const medicationDetails = ref('');

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
                    <div v-else class="flex items-center justify-between"></div>
                    <div class="text-sm text-gray-500">No trips yet.</div>
                    <UButton size="sm" @click="navigateTo('/dashboard/participant/trip-registration')">
                        Register
                    </UButton>
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
            <UCard title="Health">
                <template #default>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="flex items-center gap-2">
                                <UCheckbox v-model="hasAllergies" />
                                <span>Allergy concerns</span>
                            </label>
                            <UTextarea
                                v-if="hasAllergies"
                                v-model="allergyDetails"
                                :rows="3"
                                placeholder="List any allergies, reactions, and severity"
                            />
                        </div>
                        <div class="space-y-2">
                            <label class="flex items-center gap-2">
                                <UCheckbox v-model="takesMedications" />
                                <span>Medication concerns</span>
                            </label>
                            <UTextarea
                                v-if="takesMedications"
                                v-model="medicationDetails"
                                :rows="3"
                                placeholder="List current medications, dosage, and schedule"
                            />
                        </div>
                    </div>
                </template>
            </UCard>

            <UCard title="Documents">
                <template #default>
                    <div class="space-y-3">
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div class="space-y-1">
                                <label class="text-sm text-gray-600">Expiration date</label>
                                <UInput v-model="passportExpiration" type="date" placeholder="YYYY-MM-DD" />
                            </div>
                            <div class="space-y-1">
                                <label class="text-sm text-gray-600">Issuing country</label>
                                <UInput v-model="passportCountry" placeholder="e.g., USA" />
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <UButton size="sm" variant="soft">Waiver</UButton>
                            <UButton size="sm" variant="soft">Insurance</UButton>
                        </div>
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
                        <UButton size="sm" variant="soft" @click="() => confirmNavigate('/contact')"
                            >Message Coordinator</UButton
                        >
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>
