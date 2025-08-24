<script setup lang="ts">
    import { useAuth, useToast } from '#imports'; // ensure this import
    import { useCreateTrip } from '#shared/queries/trip';
    import type { FormError, FormSubmitEvent } from '@nuxt/ui';

    const { user } = useAuth();
    const { mutateAsync, isLoading } = useCreateTrip();
    const toast = useToast();

    const locationOptions = ['Barbarena', 'Los Chilitos'];

    type Trip = {
        churchName: string;
        location: string[];
        startDate: string;
        endDate: string;
        description: string;
        groupSize: number;
        title: string;
        email: string;
    };

    const state = reactive(<Trip>{
        churchName: '',
        location: [] as string[],
        startDate: '',
        endDate: '',
        description: '',
        groupSize: 0,
        title: '',
        email: '',
    });

    const validate = (s: typeof state): FormError[] => {
        const errors: FormError[] = [];
        if (!s.churchName) errors.push({ name: 'churchName', message: 'Required' });
        if (!s.location) errors.push({ name: 'location', message: 'Required' });
        if (!s.startDate) errors.push({ name: 'startDate', message: 'Required' });
        if (!s.endDate) errors.push({ name: 'endDate', message: 'Required' });
        if (!s.description) errors.push({ name: 'description', message: 'Required' });

        return errors;
    };

    const toDateOrUndef = (v?: string) => (v ? new Date(v) : undefined);

    async function onSubmit(_e: FormSubmitEvent<typeof state>) {
        console.log('doot');
        try {
            console.log('Submitting trip:', state);
            const res = await mutateAsync({
                data: {
                    churchName: state.churchName,
                    location: state.location.join(', '),
                    startDate: new Date(state.startDate) ?? new Date(),
                    endDate: new Date(state.endDate) ?? new Date(),
                    description: state.description,
                    groupSize: state.groupSize ?? 0,
                    title: state.title ?? '',
                    tripId: '', // Backend will generate a unique ID
                    createdByEmail: user.value?.email ?? '', // Assumes user object has an email property
                },
            });
            console.log('Trip created:', res);

            toast.add({ title: 'Success', description: 'Registration saved.', color: 'success' });
        } catch (err) {
            console.error('Create trip failed:', err);
            toast.add({ title: 'Error', description: 'Failed to save registration.', color: 'error' });
        }
    }
</script>

<template>
    <div>
        <div class="flex flex-col gap-6 pt-8">
            <UForm :state="state" :validate="validate" @submit="onSubmit">
                <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
                    <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                        <template #header>
                            <h2 class="text-lg">Your information</h2>
                        </template>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField label="Church name" name="churchName" class="md:flex-1">
                                <UInput v-model="state.churchName" class="w-full" />
                            </UFormField>
                            <UFormField label="Location" name="location" class="md:flex-1" aria-placeholder="">
                                <USelectMenu
                                    multiple
                                    v-model="state.location"
                                    :items="locationOptions"
                                    class="w-full"
                                    placeholder="Select location"
                                />
                            </UFormField>
                            <UFormField label="Start date" name="startDate" class="md:flex-1">
                                <UInput
                                    v-model="state.startDate"
                                    type="date"
                                    class="w-full"
                                    :max="state.endDate ? state.endDate.toString().slice(0, 10) : undefined"
                                />
                            </UFormField>
                            <UFormField label="End date" name="endDate" class="md:flex-1">
                                <UInput
                                    v-model="state.endDate"
                                    type="date"
                                    class="w-full"
                                    :min="state.startDate ? state.startDate.toString().slice(0, 10) : undefined"
                                />
                            </UFormField>
                        </div>
                        <div>
                            <UFormField label="Description" name="description">
                                <UInput v-model="state.description" class="w-full" />
                            </UFormField>
                        </div>
                    </UCard>

                    <div class="flex flex-col gap-4 md:flex-row">
                        <UButton color="primary" variant="ghost" type="button">Save draft</UButton>
                        <UButton type="submit" :loading="isLoading">Submit</UButton>
                    </div>
                </div>
            </UForm>
        </div>
    </div>
</template>
