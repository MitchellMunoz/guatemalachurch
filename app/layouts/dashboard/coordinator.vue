<script setup lang="ts">
    const { user, clear } = useAuth();
</script>

<template>
    <div>
        <MainMenu>
            <template #right>
                <div class="flex items-center gap-3 text-sm">
                    <h4>{{ user?.name }} - ({{ user?.role }})</h4>
                    <UButton
                        color="neutral"
                        variant="subtle"
                        icon="i-heroicons-arrow-left-on-rectangle"
                        @click="clear({ redirectTo: '/' }) as any"
                    >
                        Logout
                    </UButton>
                </div>
            </template>
        </MainMenu>
        <UMain>
            <UContainer>
                <slot />
            </UContainer>
        </UMain>
        <SiteFooter />
    </div>
</template>
