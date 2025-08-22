<script setup lang="ts">
    definePageMeta({ layout: 'dashboard-coordinator', middleware: ['protected', 'role'] });
</script>

<template>
    <div>
        <h2 class="text-xl font-semibold">Coordinator Dashboard</h2>
        <p>Trip and team coordination tools.</p>
    </div>
</template>
