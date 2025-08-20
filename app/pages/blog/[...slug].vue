<script lang="ts" setup>
    const route = useRoute();
    const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first());
</script>

<template>
    <article class="prose mx-auto">
        <ContentRenderer v-if="page" :value="page" />
        <div v-else>Post not found</div>
    </article>
</template>
