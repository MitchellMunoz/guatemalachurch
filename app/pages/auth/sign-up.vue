<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
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
    navigateTo("/auth/sign-in");
  }
};
</script>

<template>
  <UCard class="w-full max-w-sm" variant="soft">
    <UAuthForm
      title="Sign Up"
      :schema="schema"
      :validate-on="['blur']"
      @submit="onSignUp"
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
    >
      <template #description>
        Already have an account?
        <NuxtLink to="/auth/sign-in" class="font-medium text-primary-500">
          Sign In
        </NuxtLink>
      </template>
      <template #validation>
        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :description="error.message"
        />
      </template>
    </UAuthForm>
  </UCard>
</template>
