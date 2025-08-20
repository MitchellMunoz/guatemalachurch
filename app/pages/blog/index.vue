<!-- pages/blog/index.vue -->
<script setup>
    const { data: posts } = await useAsyncData('blog-list', () => queryCollection('content').all());

    const blogPosts = computed(() => (posts?.value || []).filter((p) => p.path && p.path.startsWith('/blog/')));
</script>

<template>
    <ul>
        <li v-for="p in blogPosts" :key="p.path">
            <NuxtLink :to="p.path">{{ p.title || p.path }}</NuxtLink>
        </li>
    </ul>
</template>
