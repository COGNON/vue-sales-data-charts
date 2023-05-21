<template>
  <div class="grow">
    <p class="text-lg">By Product</p>
    <template v-for="product in data" :key="product.prod">
      <div class="flex">
        <p>{{ product.prod }}</p>
        <span class="grow" />
        <p>{{ isCurrency ? '$' : '' }}{{ numToMillions(product.target) }}</p>
      </div>
      <progress-bar :max="product.target" :val="product.sum" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { byProduct } from '../utils/types';
import { numToMillions } from '../utils/utils';
import ProgressBar from '../components/ProgressBar.vue';

defineProps<{
  isCurrency?: boolean;
  data: byProduct[];
}>();
</script>
