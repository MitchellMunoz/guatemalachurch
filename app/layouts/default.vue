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
      <AuthState #default="{ loggedIn, clear, user }">
        <UButton
          v-if="!loggedIn"
          color="neutral"
          variant="solid"
          icon="i-heroicons-user"
          to="/auth/sign-in"
        >
          Login
        </UButton>
        <div class="flex items-center gap-3 text-sm" v-else>
          <h4>{{ user?.name }}</h4>
          <UButton
            color="neutral"
            variant="subtle"
            icon="i-heroicons-user"
            @click="
              () => {
                clear({ redirectTo: '/' });
              }
            "
          >
            Logout
          </UButton>
        </div>
      </AuthState>
    </template>
  </UHeader>
  <UMain class="w-full max-w-(--ui-container) mx-auto p-4 sm:px-6 lg:px-8">
    <slot />
  </UMain>
</template>
