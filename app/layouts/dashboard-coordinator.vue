<script setup lang="ts">
    import { coordinatorNav } from '~/utils/nav';
    const { user, clear } = useAuth();
</script>

<template>
    <div>
        <UHeader>
            <template #left>
                <NuxtLink to="/dashboard/coordinator"> Guatemala Church </NuxtLink>
            </template>
            <UNavigationMenu :items="coordinatorNav" />

            <template #right>
                <div class="flex items-center gap-3 text-sm">
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
            </template>
        </UHeader>
        <UMain>
            <UContainer>
                <slot />
            </UContainer>
        </UMain>
        <SiteFooter />
    </div>
</template>
