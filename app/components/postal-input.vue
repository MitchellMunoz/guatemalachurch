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
    const props = defineProps<{ modelValue?: number | null }>();
    const emit = defineEmits<{ 'update:modelValue': [number | null] }>();

    const local = ref(props.modelValue !== null ? String(props.modelValue).slice(0, 5) : '');
    watch(
        () => props.modelValue,
        (v) => {
            const s = v !== null ? String(v).slice(0, 5) : '';
            if (s !== local.value) local.value = s;
        },
    );

    function allowKey(k: string) {
        return (
            /^[0-9]$/.test(k) || ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(k)
        );
    }
    function onKeydown(e: KeyboardEvent) {
        if (!allowKey(e.key) && !(e.ctrlKey || e.metaKey || e.altKey)) e.preventDefault();
    }
    function onPaste(e: ClipboardEvent) {
        e.preventDefault();
        const s = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 5);
        local.value = s;
        emit('update:modelValue', s.length === 5 ? Number(s) : null);
    }
    function onUpdate(v: unknown) {
        const s = String(v ?? '')
            .replace(/\D/g, '')
            .slice(0, 5);
        local.value = s;
        emit('update:modelValue', s.length === 5 ? Number(s) : null);
    }
</script>
