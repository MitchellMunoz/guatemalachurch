<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/dashboard"> LOGO </NuxtLink>
    </template>

    <template #right>
      <UButton
        color="neutral"
        size="lg"
        variant="solid"
        icon="i-heroicons-user"
        to="/"
      >
        Logout
      </UButton>
    </template>
  </UHeader>
  <UMain>
    <slot />
  </UMain>
</template>
