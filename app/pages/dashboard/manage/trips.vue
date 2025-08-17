<script setup lang="ts">
    import { useToast } from '#imports'; // ensure this import
    import { useCreateRegistration } from '#shared/queries/trip-registration';
    import { US_STATES } from '@/constants/us-states';
    import type { FormError, FormSubmitEvent } from '@nuxt/ui';
    import BaseInput from '~/components/base-input.vue';
    import PostalInput from '~/components/postal-input.vue';

    const { mutateAsync, isLoading } = useCreateRegistration();
    const toast = useToast();

    const state = reactive({
        email: undefined as string | undefined,
        fName: undefined as string | undefined,
        lName: undefined as string | undefined,
        street: undefined as string | undefined,
        city: undefined as string | undefined,
        state: undefined as string | undefined,
        postal: undefined as string | undefined,
        phone: undefined as string | undefined,
        dob: undefined as string | undefined, // input type="date" gives 'YYYY-MM-DD'
        cName: undefined as string | undefined,
        pName: undefined as string | undefined,
    });

    const validate = (s: typeof state): FormError[] => {
        const errors: FormError[] = [];
        if (!s.email) errors.push({ name: 'email', message: 'Required' });
        return errors;
    };

    const toDateOrUndef = (v?: string) => (v ? new Date(v) : undefined);

    async function onSubmit(_e: FormSubmitEvent<typeof state>) {
        try {
            const res = await mutateAsync({
                data: {
                    registrationType: isChurch.value ? 'CHURCH' : 'INDIVIDUAL',
                    trip: {
                        create: {
                            startDate: new Date('2025-08-15'),
                            endDate: new Date('2025-08-20'),
                            groupSize: 10,
                        },
                    },
                    profiles: {
                        create: {
                            email: state.email!,
                            city: state.city,
                            dob: toDateOrUndef(state.dob),
                            fName: state.fName,
                            lName: state.lName,
                            phone: state.phone,
                            postal: state.postal,
                            state: state.state,
                            street: state.street,
                        },
                    },
                },
            });
            console.log('Trip created:', res);

            toast.add({ title: 'Success', description: 'Registration saved.', color: 'success' });
        } catch (err) {
            console.error('Create trip failed:', err);
            toast.add({ title: 'Error', description: 'Failed to save registration.', color: 'error' });
        }
    }

    const selectedTab = ref('individual');

    const isChurch = computed(() => {
        return selectedTab.value === 'church';
    });
</script>

<template>
    <div>
        <div class="flex justify-end pt-8">
            <UTabs
                v-model="selectedTab"
                :items="[
                    { value: 'individual', label: 'Individual' },
                    { value: 'church', label: 'Church' },
                ]"
            />
        </div>
        <div class="flex flex-col gap-6 pt-8">
            <UForm :state="state" :validate="validate" @submit="onSubmit">
                <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
                    <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                        <template #header>
                            <h2 class="text-lg">Your information</h2>
                        </template>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField :label="isChurch ? 'Church name' : 'First name'" name="fname" class="md:flex-1">
                                <BaseInput v-model="state.fName" class="w-full" />
                            </UFormField>
                            <UFormField
                                :label="isChurch ? 'Primary Contact' : 'Last Name'"
                                name="lname"
                                class="md:flex-1"
                            >
                                <BaseInput v-model="state.lName" class="w-full" />
                            </UFormField>
                        </div>

                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField label="Email" name="email" class="md:flex-1">
                                <BaseInput v-model="state.email" label="Email" type="email" />
                            </UFormField>

                            <UFormField label="Mobile phone" name="phone" class="md:flex-1">
                                <BaseInput v-model="state.phone" type="tel" class="w-full" />
                            </UFormField>
                        </div>
                    </UCard>

                    <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                        <template #header>
                            <h2 class="text-lg">Address & Age</h2>
                        </template>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField label="Street address" name="street" class="md:flex-1">
                                <BaseInput v-model="state.street" class="w-full" />
                            </UFormField>
                            <UFormField label="City" name="city" class="md:flex-1">
                                <BaseInput v-model="state.city" class="w-full" />
                            </UFormField>
                        </div>
                        <div class="flex flex-col gap-4 md:flex-row md:gap-6">
                            <UFormField label="State" name="region" class="md:flex-1">
                                <BaseInput
                                    v-model="state.state"
                                    :select="true"
                                    :options="[...US_STATES]"
                                    placeholder="Select state"
                                />
                            </UFormField>
                            <UFormField label="Postal code" name="postal" class="md:flex-1">
                                <PostalInput
                                    v-model="state.postal"
                                    label="12345"
                                    class="w-full"
                                    digits-only
                                    :max-length="5"
                                    inputmode="numeric"
                                />
                            </UFormField>
                            <UFormField label="Date of birth" name="dob" class="md:flex-1">
                                <BaseInput v-model="state.dob" type="date" class="w-full" />
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
