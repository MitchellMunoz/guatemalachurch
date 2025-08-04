<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/"> Guatemala Church </NuxtLink>
    </template>
    <UNavigationMenu
      :items="[
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Projects', to: '/projects' },
        { label: 'Blog', to: '/blog' },
      ]"
    />
    <template #right>
      <UButton
        color="neutral"
        size="lg"
        variant="solid"
        icon="i-heroicons-user"
        to="/auth/sign-in"
      >
        Login
      </UButton>
    </template>
  </UHeader>
  <UMain>
    <slot />
  </UMain>
</template>
