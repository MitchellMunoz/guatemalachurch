<script setup lang="ts">
    import { UFormField } from '#components';
    import { useAuth, useToast } from '#imports'; // ensure this import
    import { useCreateRegistration } from '#shared/queries/trip-registration';
    import type { FormError, FormSubmitEvent } from '@nuxt/ui';

    const { mutateAsync, isLoading } = useCreateRegistration();
    const toast = useToast();
    const { user } = useAuth();
    const state = reactive({
        email: undefined as string | undefined,
        firstName: undefined as string | undefined,
        lastName: undefined as string | undefined,
        street: undefined as string | undefined,
        city: undefined as string | undefined,
        state: undefined as string | undefined,
        postal: undefined as string | undefined,
        phone: undefined as string | undefined,
        dob: undefined as string | undefined,
        primaryContact: undefined as string | undefined,
        code: undefined as string | undefined,
    });

    const validate = (s: typeof state): FormError[] => {
        const errors: FormError[] = [];
        if (!s.email) errors.push({ name: 'email', message: 'Required' });
        if (!s.firstName) errors.push({ name: 'firstName', message: 'Required' });
        if (!s.lastName) errors.push({ name: 'lastName', message: 'Required' });
        if (!s.phone) errors.push({ name: 'phone', message: 'Required' });
        if (!s.street) errors.push({ name: 'street', message: 'Required' });
        if (!s.city) errors.push({ name: 'city', message: 'Required' });
        if (!s.state) errors.push({ name: 'state', message: 'Required' });
        if (!s.postal) errors.push({ name: 'postal', message: 'Required' });
        if (!s.dob) errors.push({ name: 'dob', message: 'Required' });
        if (!s.primaryContact) errors.push({ name: 'primaryContact', message: 'Required' });

        return errors;
    };

    const toDateOrUndef = (v?: string) => (v ? new Date(v) : undefined);

    async function onSubmit(_e: FormSubmitEvent<typeof state>) {
        try {
            console.log('state', state);
            await mutateAsync({
                data: {
                    trip: { connect: { code: state.code!.trim() } },
                    registrant: { connect: { id: user.value!.id } },
                    primaryContact: state.primaryContact!,
                    city: state.city,
                    dob: toDateOrUndef(state.dob),
                    phone: state.phone,
                    postal: state.postal,
                    state: state.state,
                    street: state.street,
                },
            });

            toast.add({ title: 'Success', description: 'Registration saved.', color: 'success' });
        } catch (err) {
            console.error('Trip  Registration Failed:', err);
            toast.add({ title: 'Error', description: 'Failed to save registration.', color: 'error' });
        }
    }
</script>

<template>
    <div>
        <div class="flex justify-end pt-8"></div>
        <div class="flex flex-col gap-6 pt-8">
            <UForm :state="state" :validate="validate" @submit="onSubmit">
                <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
                    <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                        <template #header>
                            <h2 class="text-lg">Your information</h2>
                        </template>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField
                                :label="'Trip Code'"
                                name="code"
                                class="md:flex-1"
                                help="Provided by your coordinator"
                            >
                                <UInput v-model="state.code" class="w-full" />
                            </UFormField>
                            <UFormField :label="'First name'" name="firstName" class="md:flex-1">
                                <UInput v-model="state.firstName" class="w-full" />
                            </UFormField>
                            <UFormField :label="'Last Name'" name="lastName" class="md:flex-1">
                                <UInput v-model="state.lastName" class="w-full" />
                            </UFormField>
                        </div>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField label="Email" name="email" class="md:flex-1">
                                <UInput v-model="state.email" type="email" class="w-full" />
                            </UFormField>
                            <UFormField label="Mobile phone" name="phone" class="md:flex-1">
                                <UInput v-model="state.phone" type="tel" class="w-full" />
                            </UFormField>
                        </div>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField label="Primary Contact" name="primaryContact" class="md:flex-1">
                                <UInput v-model="state.primaryContact" type="tel" class="w-full" />
                            </UFormField>
                        </div>
                    </UCard>

                    <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                        <template #header>
                            <h2 class="text-lg">Address & Age</h2>
                        </template>
                        <div class="flex flex-col md:flex-row md:gap-6">
                            <UFormField label="Street address" name="street" class="md:flex-1">
                                <UInput v-model="state.street" class="w-full" />
                            </UFormField>
                            <UFormField label="City" name="city" class="md:flex-1">
                                <UInput v-model="state.city" class="w-full" />
                            </UFormField>
                        </div>
                        <div class="flex flex-col gap-4 md:flex-row md:gap-6">
                            <UFormField label="State" name="region" class="md:flex-1">
                                <UInput v-model="state.state" class="w-full" />
                            </UFormField>
                            <UFormField label="Postal code" name="postal" class="md:flex-1">
                                <UInput v-model="state.postal" class="w-full" />
                            </UFormField>
                            <UFormField label="Date of birth" name="dob" class="md:flex-1">
                                <UInput v-model="state.dob" type="date" class="w-full" />
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
