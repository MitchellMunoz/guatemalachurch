<script setup lang="ts">
    const { user } = useAuth();
    const mode = computed(() => (user.value?.role === 'COORDINATOR' ? 'church' : 'individual'));

    //  const backTo = computed(() => `/dashboard/${mode.value}`);
</script>

<template>
    <div>
        <TripRegistrationForm :mode="mode" />
    </div>
</template>
