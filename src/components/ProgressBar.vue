<template>
  <div class="w-full bg-neutral-200 dark:bg-neutral-600">
    <div
      class="bg-blue-300 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
      :style="{ width: `${percentage}%` }"
    />
  </div>
  <div v-if="doLabels" class="flex">
    <p class="text-xs">{{ numToMillions(percentage) }}%</p>
    <span class="grow" />
    <p class="text-xs">${{ numToMillions(max) }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { numToMillions } from '../utils/utils';

const props = defineProps<{ max: number; val: number; doLabels?: boolean }>();
const percentage = computed(() => (props.val / props.max) * 100);
</script>
