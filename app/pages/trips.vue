<script setup lang="ts">
    import type { FormError, FormSubmitEvent } from '@nuxt/ui';

    const state = reactive({
        email: undefined,
        password: undefined,
        fName: undefined,
        lName: undefined,
        street: undefined,
        city: undefined,
        state: undefined,
        postal: undefined,
        phone: undefined,
        dob: undefined,
    });

    const validate = (state: any): FormError[] => {
        const errors = [];
        if (!state.email) errors.push({ name: 'email', message: 'Required' });
        if (!state.password) errors.push({ name: 'password', message: 'Required' });
        return errors;
    };

    const toast = useToast();
    async function onSubmit(event: FormSubmitEvent<typeof state>) {
        toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' });
        console.log(event.data);
    }
</script>
<template>
    <UForm :state="state" :validate="validate" @submit="onSubmit">
        <div class="flex flex-col gap-6 md:flex-col lg:flex-col">
            <UCard class="w-full rounded-2xl border pb-4 shadow-sm">
                <template #header>
                    <h2 class="text-lg">Your information</h2>
                </template>

                <div class="flex flex-col md:flex-row md:gap-6">
                    <UFormField label="First name" name="fname" class="md:flex-1">
                        <UInput v-model="state.fName" class="w-full" />
                    </UFormField>

                    <UFormField label="Last name" name="lname" class="md:flex-1">
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
</template>
