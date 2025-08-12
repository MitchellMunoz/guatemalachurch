<script setup lang="ts">
    import { PiniaColadaDevtools } from '@pinia/colada-devtools';
</script>

<template>
    <UApp>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <PiniaColadaDevtools />
    </UApp>
</template>
