<script setup lang="ts">
    import { useToast } from '#imports'; // ensure this import
    import { useCreateTrip } from '#shared/queries/trip-registration';
    import type { FormError, FormSubmitEvent } from '@nuxt/ui';

    const createTrip = useCreateTrip();
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
            const args = {
                data: {
                    email: state.email!,
                    fName: state.fName ?? undefined,
                    lName: state.lName ?? undefined,
                    street: state.street ?? undefined,
                    city: state.city ?? undefined,
                    state: state.state ?? undefined,
                    postal: state.postal ?? undefined,
                    phone: state.phone ?? undefined,
                    dob: toDateOrUndef(state.dob),
                    cName: state.cName ?? undefined,
                    pName: state.pName ?? undefined,
                },
            };

            const res = await createTrip.mutateAsync(args);
            console.log('Trip created:', res);

            toast.add({ title: 'Success', description: 'Registration saved.', color: 'success' });
        } catch (err) {
            console.error('Create trip failed:', err);
            toast.add({ title: 'Error', description: 'Failed to save registration.', color: 'error' });
        }
    }

    const showIndividual = ref(true);
    const showChurch = ref(false);
    function selectIndividual() {
        showIndividual.value = true;
        showChurch.value = false;
    }
    function selectChurch() {
        showIndividual.value = false;
        showChurch.value = true;
    }
</script>
<template>
    <!-- Buttons -->
    <div class="flex justify-end gap-3 pt-8">
        <UButton
            @click="selectIndividual"
            :color="showIndividual ? 'primary' : 'neutral'"
            :variant="showIndividual ? 'solid' : 'outline'"
            >Individual</UButton
        >
        <UButton
            @click="selectChurch"
            :color="showChurch ? 'primary' : 'neutral'"
            :variant="showChurch ? 'solid' : 'outline'"
            >Church</UButton
        >
    </div>

    <!-- Shared container for forms -->
    <div class="flex flex-col gap-6 pt-8">
        <!-- Individual Form -->
        <UForm v-if="showIndividual" :state="state" :validate="validate" @submit="onSubmit">
            <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
                <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                    <template #header>
                        <h2 class="text-lg">Your information</h2>
                    </template>
                    <div class="flex flex-col md:flex-row md:gap-6">
                        <UFormField label="First name" name="fname" class="md:flex-1">
                            <UInput v-model="state.fName" class="w-full" />
                        </UFormField>
                        <UFormField label="Last Name" name="lname" class="md:flex-1">
                            <UInput v-model="state.lName" class="w-full" />
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
                    <UButton type="submit">Submit</UButton>
                </div>
            </div>
        </UForm>

        <!-- Church Form -->
        <UForm v-if="showChurch" :state="state" :validate="validate" @submit="onSubmit">
            <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
                <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                    <template #header>
                        <h2 class="text-lg">Your information</h2>
                    </template>
                    <div class="flex flex-col md:flex-row md:gap-6">
                        <UFormField label="Church Name" name="cName" class="md:flex-1">
                            <UInput v-model="state.cName" class="w-full" />
                        </UFormField>
                        <UFormField label="Primary Contact" name="pName" class="md:flex-1">
                            <UInput v-model="state.pName" class="w-full" />
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
                    <UButton :loading="createTrip.isLoading.value" type="submit">Submit</UButton>
                </div>
            </div>
        </UForm>
    </div>
</template>
