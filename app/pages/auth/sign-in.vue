<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { signIn } = useAuth();

const { isLoading, error, mutateAsync: asyncSignIn } = signIn.withEmail();

const onSignIn = async ({ data }: FormSubmitEvent<z.infer<typeof schema>>) => {
  const success = await asyncSignIn({
    email: data.email,
    password: data.password,
  });

  if (success) {
    navigateTo("/dashboard");
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
        <ULink to="/auth/sign-up" class="font-medium text-primary-500">
          Create One </ULink
        >.
      </template>
      <template #validation>
        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :description="error.message"
        />
      </template>
      <template #footer>
        <ULink to="/auth/forgot-password" class="text-sm text-primary-500">
          Forgot Password?
        </ULink>
      </template>
    </UAuthForm>
  </UCard>
</template>
