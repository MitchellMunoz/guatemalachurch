<template>
    <!-- Select mode (e.g., State) -->
    <USelect
        v-if="select"
        v-bind="$attrs"
        class="w-full"
        :options="options"
        :placeholder="placeholder || label"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
    />
    <!-- Text mode (default) -->
    <UInput
        v-else
        v-bind="$attrs"
        class="w-full"
        :placeholder="placeholder || label"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>

<script lang="ts">
    import type { PropType } from 'vue';
    export default {
        inheritAttrs: true,
        props: {
            modelValue: { type: [String, Number], default: '' },
            label: { type: String, default: '' },
            placeholder: { type: String, default: '' },
            select: { type: Boolean, default: false },
            options: { type: Array as PropType<ReadonlyArray<{ label: string; value: string }>>, default: () => [] },
        },
        emits: ['update:modelValue'],
    };
</script>
