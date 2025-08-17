<script setup lang="ts">
    import type { FormSubmitEvent } from '@nuxt/ui';
    import { z } from 'zod';

    definePageMeta({
        layout: 'auth',
    });

    const schema = z.object({
        email: z.email('You Must Enter a Valid Email.'),
        password: z.string('You Must Enter a Password.').min(6, { message: 'Must be at least 6 characters' }),
        confirmPassword: z.string('You Must Enter a Password.').min(6, { message: 'Must be at least 6 characters' }),
        firstName: z.string('You Must Enter a First Name.').min(1, { message: 'You Must Enter a First Name.' }),
        lastName: z.string('You Must Enter a Last Name.').min(1, { message: 'You Must Enter a Last Name.' }),
    });

    const { signUp } = useAuth();

    const { error, isLoading, mutateAsync: asyncSignUp } = signUp.withEmail();

    const onSignUp = async ({ data }: FormSubmitEvent<z.infer<typeof schema>>) => {
        const success = await asyncSignUp({
            email: data.email,
            password: data.password,
            name: `${data.firstName} ${data.lastName}`,
        });

        if (success) {
            navigateTo('/auth/sign-in');
        }
    };
</script>

<template>
    <UCard class="w-full max-w-sm" variant="soft">
        <UAuthForm
            title="Sign Up"
            :schema="schema"
            :validate-on="['blur']"
            :loading="isLoading"
            :fields="[
                {
                    name: 'email',
                    type: 'text',
                    label: 'Email',
                },
                {
                    name: 'password',
                    type: 'password',
                    label: 'Password',
                },
                {
                    name: 'confirmPassword',
                    type: 'password',
                    label: 'Confirm Password',
                },
                {
                    name: 'firstName',
                    type: 'text',
                    label: 'First Name',
                },
                {
                    name: 'lastName',
                    type: 'text',
                    label: 'Last Name',
                },
            ]"
            @submit="onSignUp"
        >
            <template #description>
                Already have an account?
                <NuxtLink to="/auth/sign-in" class="text-primary-500 font-medium"> Sign In </NuxtLink>
            </template>
            <template #validation>
                <UAlert v-if="error" color="error" variant="soft" :description="error.message" />
            </template>
        </UAuthForm>
    </UCard>
</template>
