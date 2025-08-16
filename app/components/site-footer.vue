<script setup lang="ts">
    const year = new Date().getFullYear();
    const links = [
        { label: 'About', to: '/about' },
        { label: 'Projects', to: '/projects' },
        { label: 'Blog', to: '/blog' },
        { label: 'Trips', to: '/dashboard/manage/trips' },
    ];
</script>

<template>
    <footer class="border-t py-8">
        <UContainer>
            <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div class="text-center sm:text-left">
                    <div class="font-semibold">Guatemala Church</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">© {{ year }} All rights reserved.</div>
                </div>

                <nav class="flex flex-wrap items-center justify-center gap-4">
                    <ULink v-for="l in links" :key="l.to" :to="l.to" class="text-sm text-gray-700 dark:text-gray-300">
                        {{ l.label }}
                    </ULink>
                    <span class="hidden text-gray-400 sm:inline">|</span>
                    <ULink to="https://www.acts29.com" target="_blank" rel="noopener" class="text-primary-500 text-sm">
                        Acts 29
                    </ULink>
                </nav>
            </div>
        </UContainer>
    </footer>
</template>
