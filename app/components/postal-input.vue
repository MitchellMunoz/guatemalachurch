<!-- app/components/postal-input.vue -->
<template>
    <UInput
        class="w-full"
        placeholder="12345"
        inputmode="numeric"
        :maxlength="5"
        :model-value="local"
        @keydown="onKeydown"
        @paste="onPaste"
        @update:model-value="onUpdate"
    />
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps<{ modelValue?: number | null }>();
    const emit = defineEmits<{ (e: 'update:modelValue', v: number | null): void }>();

    function normalize(v: unknown): string {
        return v === null ? '' : String(v).replace(/\D/g, '').slice(0, 5);
    }

    const local = ref<string>(normalize(props.modelValue));

    watch(
        () => props.modelValue,
        (v) => {
            const s = normalize(v);
            if (s !== local.value) local.value = s;
        },
    );

    function allowKey(k: string): boolean {
        return (
            /^[0-9]$/.test(k) || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(k)
        );
    }

    function onKeydown(e: KeyboardEvent) {
        if (!allowKey(e.key) && !(e.ctrlKey || e.metaKey || e.altKey)) e.preventDefault();
    }

    function onPaste(e: ClipboardEvent) {
        e.preventDefault();
        const s = normalize(e.clipboardData?.getData('text') ?? '');
        local.value = s;
        emit('update:modelValue', s.length === 5 ? Number(s) : null);
    }

    function onUpdate(v: unknown) {
        const s = normalize(v);
        local.value = s;
        emit('update:modelValue', s.length === 5 ? Number(s) : null);
    }
</script>
