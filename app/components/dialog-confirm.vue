<script lang="ts" setup>
    interface Props {
        size?: 'sm' | 'md';
        title: string;
        description?: string;
        confirmLabel?: string;
        dismissLabel?: string;
        clickToClose?: boolean;
        async?: boolean;
        onConfirm?: (() => void) | (() => Promise<void>);
        onDismiss?: () => void;
    }
    const { size = 'sm', confirmLabel = 'Yes', dismissLabel = 'No', async = false, ...props } = defineProps<Props>();

    const sizeClass = computed(() => {
        switch (size) {
            case 'sm':
                return 'sm:max-w-md';
            case 'md':
                return 'sm:max-w-3xl';
            default:
                return 'max-w-3xl';
        }
    });

    const isConfirming = ref(false);

    const confirm = async () => {
        if (props.onConfirm) {
            if (async) {
                isConfirming.value = true;
                await Promise.resolve(props.onConfirm());
                isConfirming.value = false;
            } else {
                props.onConfirm();
            }
        }
    };
</script>

<template>
    <UModal
        :dismissible="clickToClose"
        :close="false"
        :title="title"
        :ui="{
            content: `${sizeClass} divide-y-0`,
            header: 'px-2 sm:px-5 py-3',
            body: 'p-2 sm:p-5 sm:pt-0',
            footer: 'justify-end gap-3',
        }"
    >
        <template #body>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="text-sm text-gray-500" v-html="description" />
        </template>
        <template #footer>
            <UButton
                v-if="dismissLabel"
                :ui="{ base: 'justify-around' }"
                color="neutral"
                variant="outline"
                :label="dismissLabel"
                @click="onDismiss"
            />
            <UButton
                color="neutral"
                :loading="isConfirming"
                :label="confirmLabel"
                :ui="{ base: 'justify-around' }"
                @click="confirm"
            />
        </template>
    </UModal>
</template>
