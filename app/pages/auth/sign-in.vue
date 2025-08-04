<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UCard class="w-full max-w-sm" variant="soft">
    <UAuthForm
      title="Login"
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
