<script setup lang="ts">
    interface Props {
        title?: string;
        size?: 'md' | 'lg';
        dismissible?: boolean;
    }

    const { size = 'md', title = '', dismissible = true } = defineProps<Props>();

    const sizeClass = computed(() => {
        switch (size) {
            case 'md':
                return 'w-full max-w-md';
            default:
                return 'w-full max-w-2xl';
        }
    });
</script>

<template>
    <USlideover :dismissible="dismissible" :title="title" :ui="{ content: `${sizeClass}` }">
        <template #body> <slot /> </template>
        <template #footer>
            <slot name="footer" />
        </template>
    </USlideover>
</template>
