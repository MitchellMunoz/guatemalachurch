<script setup lang="ts">
    import { useToast } from '#imports'; // ensure this import
    import { useCreateRegistration } from '#shared/queries/trip-registration';
    import type { FormError, FormSubmitEvent } from '@nuxt/ui';
    import type { UserRole } from '~~/.generated/prisma/client';

    const { mutateAsync, isLoading } = useCreateRegistration();
    const toast = useToast();

    const state = reactive({
        email: undefined as string | undefined,
        churchName: undefined as string | undefined,
        firstName: undefined as string | undefined,
        title: undefined as string | undefined,
        lastName: undefined as string | undefined,
        street: undefined as string | undefined,
        city: undefined as string | undefined,
        state: undefined as string | undefined,
        postal: undefined as string | undefined,
        phone: undefined as string | undefined,
        dob: undefined as string | undefined,
        startDate: undefined as string | undefined,
        endDate: undefined as string | undefined,
        groupSize: undefined as number | undefined,
        location: undefined as string | undefined,
        tripId: undefined as string | undefined,
    });
    const { user } = useAuth();
    const u = user.value!;
    state.email ??= u.email ?? undefined;
    const [first, ...rest] = (u.name ?? '').trim().split(' ');
    state.firstName ??= first || undefined;
    state.lastName ??= rest.join(' ') || undefined;

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
                    registrationType: 'CHURCH',
                    trip: {
                        create: {
                            title: state.title!,
                            tripId: state.tripId!,
                            createdByRole: u.role as UserRole,
                            createdByEmail: u.email,
                            startDate: new Date('state.startDate!'),
                            endDate: new Date('state.endDate!'),
                            groupSize: state.groupSize!,
                        },
                    },
                    profiles: {
                        create: {
                            email: state.email!,
                            city: state.city,
                            dob: toDateOrUndef(state.dob),
                            churchName: state.churchName,
                            firstName: state.firstName,
                            lastName: state.lastName,
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
                            <UFormField label="Church name" name="churchname" class="md:flex-1">
                                <UInput v-model="state.churchName" class="w-full" />
                            </UFormField>
                            <UFormField label="First Name" name="firstname" class="md:flex-1">
                                <UInput v-model="state.firstName" class="w-full" />
                            </UFormField>
                            <UFormField label="Last Name" name="lastname" class="md:flex-1">
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
