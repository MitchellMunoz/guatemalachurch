<script setup lang="ts">
import * as z from 'zod';
const schema = z.object({
  email: z.string().email(),
});
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UCard class="w-full max-w-sm" variant="soft">
    <UAuthForm
      title="Forgot Password"
      :schema="schema"
      :validate-on="['blur']"
      :fields="[
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
      ]"
    >
      <template #description>
        Don't have an account?
        <ULink to="/auth/sign-up" class="font-medium text-primary-500">
          Create One </ULink
        >.
      </template>
      <template #footer>
        <div class="flex justify-between">
          <ULink to="/auth/sign-in" class="text-sm text-primary-500">
            Back to Sign In
          </ULink>
          <ULink to="/auth/sign-up" class="text-sm text-primary-500">
            Sign Up
          </ULink>
        </div>
      </template>
    </UAuthForm>
  </UCard>
</template>
