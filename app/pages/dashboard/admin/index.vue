<script setup lang="ts">
    definePageMeta({ layout: 'dashboard-admin', middleware: ['protected', 'role'] });
</script>

<template>
    <div>
        <h2 class="text-xl font-semibold">Admin Dashboard</h2>
        <p>Administrative tools and reports.</p>
    </div>
</template>
