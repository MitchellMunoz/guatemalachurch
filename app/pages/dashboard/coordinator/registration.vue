<script setup lang="ts">
    import { setPageLayout } from '#app';

    setPageLayout('dashboard-coordinator');
    useHead({ title: 'Church Registration' });
</script>

<template>
    <div class="py-4">
        <UCard>
            <template #header>
                <h2 class="text-lg font-semibold">Church Registration</h2>
            </template>
            <TripRegistrationForm mode="church" />
        </UCard>
    </div>
</template>






