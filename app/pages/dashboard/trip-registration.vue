<script setup lang="ts">
    const { user } = useAuth();
    const mode = computed(() => (user.value?.role === 'COORDINATOR' ? 'church' : 'individual'));
</script>

<template>
    <TripRegistrationForm :mode="mode" />
</template>
