<script setup lang="ts">
    const { data: page } = await useAsyncData('BlogPostList', () => queryCollection('content').all());
</script>

<template>
    <div class="gap mx-auto mt-8 max-w-3xl px-4">
        <section class="flex flex-col gap-6">
            <div
                v-for="blog in page"
                :key="blog.path"
                class="rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
                <NuxtLink :to="blog.path" class="block p-6">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ blog.title }}
                    </h3>
                    <p v-if="blog.description" class="mt-2 text-gray-600 dark:text-gray-300">
                        {{ blog.description }}
                    </p>
                </NuxtLink>
            </div>
        </section>
    </div>
</template>
