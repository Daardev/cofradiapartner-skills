<template>
  <button @click="handleClick" data-testid="btn">{{ label }}</button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps<{ label: string }>();
const emit = defineEmits<{ (e: 'click'): void }>();
function handleClick() {
  emit('click');
}
</script>

<style scoped>
button { cursor: pointer; }
</style>
