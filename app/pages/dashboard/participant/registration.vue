<script setup lang="ts">
    import { setPageLayout } from '#app';

    setPageLayout('dashboard-participant');

    useHead({
        title: 'Trip Registration',
    });
</script>

<template>
    <div class="py-4">
        <UCard>
            <template #header>
                <h2 class="text-lg font-semibold">Trip Registration</h2>
            </template>
            <TripRegistrationForm mode="individual" />
        </UCard>
    </div>
</template>
