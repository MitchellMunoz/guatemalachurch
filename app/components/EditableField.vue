<template>
  <span v-if="!editing" @click="editing = true">{{ modelValue }}</span>
  <input
    v-else
    :value="modelValue"
    class="border-b border-gray-300 focus:border-blue-500 focus:outline-none"
    style="min-width: 100px"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
    @blur="onCommit($event)"
    @keyup.enter.prevent="onCommit($event)"
    
  />
</template>

<script setup lang="ts">
const _props = defineProps<{ modelValue: string }>();
const _emits = defineEmits(['update:modelValue', 'commit']);
const editing = ref(false);

function onCommit(event: Event) {
  const value = (event.target as HTMLInputElement)?.value || '';
  editing.value = false;
  // Ensure latest value is propagated and then commit
  _emits('update:modelValue', value);
  _emits('commit', value);
}
</script>