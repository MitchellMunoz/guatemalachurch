<script setup lang="ts">
    const props = defineProps<{ extraNav?: { label: string; to: string }[] }>();
</script>

<template>
    <UHeader>
        <template #left>
            <NuxtLink to="/"> Guatemala Church </NuxtLink>
        </template>
        <AuthState v-slot="{ loggedIn, user }">
            <UNavigationMenu
                :items="
                    loggedIn
                        ? [
                              { label: 'Home', to: '/' },
                              { label: 'About', to: '/about' },
                              { label: 'Contact', to: '/contact' },
                              { label: 'Projects', to: '/projects' },
                              { label: 'Blog', to: '/blog' },
                              { label: 'Dashboard', to: `/dashboard/${(user?.role || 'participant').toLowerCase()}` },
                              ...(props.extraNav ?? []),
                          ]
                        : [
                              { label: 'Home', to: '/' },
                              { label: 'About', to: '/about' },
                              { label: 'Contact', to: '/contact' },
                              { label: 'Projects', to: '/projects' },
                              { label: 'Blog', to: '/blog' },
                              ...(props.extraNav ?? []),
                          ]
                "
            />
        </AuthState>
        <template #right>
            <slot name="right">
                <AuthState v-slot="{ loggedIn }">
                    <UButton
                        v-if="!loggedIn"
                        color="neutral"
                        variant="solid"
                        icon="i-heroicons-user"
                        to="/auth/sign-in"
                    >
                        Login
                    </UButton>
                </AuthState>
            </slot>
        </template>
    </UHeader>
</template>
