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
            <AuthState v-slot="{ loggedIn }">
                <UButton v-if="!loggedIn" color="neutral" variant="solid" icon="i-heroicons-user" to="/auth/sign-in">
                    Login
                </UButton>
                <div v-else class="flex items-center gap-3 text-sm">
                    <UButton color="neutral" variant="subtle" icon="i-heroicons-user" to="/dashboard">
                        Dashboard
                    </UButton>
                </div>
            </AuthState>
        </template>
    </UHeader>
</template>
