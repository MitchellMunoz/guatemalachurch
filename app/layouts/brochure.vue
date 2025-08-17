<script setup lang="ts">
    import HeroSplash from '@/components/hero-splash.vue';
    const route = useRoute();

    type HeroSplashProps = InstanceType<typeof HeroSplash>['$props'];
    const splash = computed<HeroSplashProps | undefined>(() => {
        const s = route.meta.splash as unknown;
        // Check that s is an object and has a string src property
        if (
            s &&
            typeof s === 'object' &&
            'src' in s &&
            typeof (s as { src: unknown }).src === 'string' &&
            (s as { src: string }).src
        ) {
            return s as HeroSplashProps;
        }
        return undefined;
    });
</script>

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
