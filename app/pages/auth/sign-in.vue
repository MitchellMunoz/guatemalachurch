<script setup lang="ts">
    import type { FormSubmitEvent } from '@nuxt/ui';
    import { z } from 'zod';

    definePageMeta({
        layout: 'auth',
    });

    const schema = z.object({
        email: z.email('You Must Enter a Valid Email'),
        password: z.string('You Must Enter a Password.').min(6, { message: 'Must be at least 6 characters' }),
    });

    const { signIn } = useAuth();

    const { isLoading, error, mutateAsync: asyncSignIn } = signIn.withEmail();

    const onSignIn = async ({ data }: FormSubmitEvent<z.infer<typeof schema>>) => {
        const success = await asyncSignIn({
            email: data.email,
            password: data.password,
        });

        if (success) {
            const { user } = useAuth();
            const role = user.value?.role?.toLowerCase() || 'participant';
            navigateTo(`/dashboard/${role}`);
        }
    };
</script>

<template>
    <UCard class="w-full max-w-sm" variant="soft">
        <UAuthForm
            :loading="isLoading"
            title="Login"
            :schema="schema"
            :validate-on="['blur']"
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
            ]"
            @submit="onSignIn"
        >
            <template #description>
                Don't have an account?
                <ULink to="/auth/sign-up" class="text-primary-500 font-medium"> Create One </ULink>.
            </template>
            <template #validation>
                <UAlert v-if="error" color="error" variant="soft" :description="error.message" />
            </template>
            <template #footer>
                <ULink to="/auth/forgot-password" class="text-primary-500 text-sm"> Forgot Password? </ULink>
            </template>
        </UAuthForm>
    </UCard>
</template>
