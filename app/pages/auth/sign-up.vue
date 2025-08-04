<script setup lang="ts">
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UCard class="w-full max-w-sm" variant="soft">
    <UAuthForm
      title="Sign Up"
      :schema="schema"
      :validate-on="['blur']"
      :fields="[
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'phone',
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
        Don't have an account?
        <ULink to="/auth/sign-up" class="font-medium text-primary-500">
          Create One </ULink
        >.
      </template>
    </UAuthForm>
  </UCard>
</template>
