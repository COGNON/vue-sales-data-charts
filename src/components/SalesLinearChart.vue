<template>
  <apexchart width="500" :type="type || 'bar'" :options="options" :series="series" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ApexOptions } from 'apexcharts';

const props = defineProps<{
  series: ApexAxisChartSeries;
  labels: string[];
  title: string;
  options?: ApexOptions;
  type?: string;
}>();

const options = computed<ApexOptions>(() => {
  return {
    labels: props.labels,
    title: { text: props.title },
    ...props.options
  };
});
</script>
