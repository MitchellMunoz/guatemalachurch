<template>
    <div>
        <MainMenu />
        <slot name="splash">
            <HeroSplash v-if="splash" v-bind="splash" />
        </slot>
        <UMain>
            <UContainer>
                <slot />
            </UContainer>
        </UMain>
        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
    import HeroSplash from '@/components/hero-splash.vue';

    const route = useRoute();
    const splash = computed(() => route.meta.splash as any | undefined);
</script>
