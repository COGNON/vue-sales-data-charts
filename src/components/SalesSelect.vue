<template>
  <div class="flex flex-col">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="sales-select">
      <select
        :id="id"
        :model-value="modelValue"
        :name="id"
        class="hidden"
        @input="(event) => $emit('update:modelValue', event.target.value)"
      >
        <template v-if="typeof options[0] === 'object'">
          <option v-for="opt in options" :key="opt.label" :value="opt.value">
            {{ opt.label }}
          </option>
        </template>
        <template v-else>
          <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
        </template>
      </select>

      <div class="select-selected" :class="BGCLASS" aria-hidden @click.stop="open = !open">
        <template v-if="typeof options[0] === 'object' && emitValue">
          {{ getMappedOption(modelValue) }}
        </template>
        <template v-else>
          {{ modelValue }}
        </template>
      </div>
      <div class="select-items" :class="[open ? 'block' : 'hidden', BGCLASS]" aria-hidden>
        <template v-if="typeof options[0] === 'object'">
          <div
            v-for="opt in options"
            :key="opt.label"
            :value="opt.value"
            :class="OPTBGCLASS"
            @click="selectOpt(opt)"
          >
            {{ opt.label }}
          </div>
        </template>
        <template v-else>
          <div
            v-for="opt in options"
            :key="opt"
            :value="opt"
            :class="OPTBGCLASS"
            @click="selectOpt(opt)"
          >
            {{ opt }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const BGCLASS = 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 hover:dark:bg-slate-700';
const OPTBGCLASS = 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 hover:dark:bg-slate-600';

const props = defineProps<{
  modelValue: string | number | null | undefined;
  label?: string;
  id?: string;
  options?: string[] | number[] | { label: string; value: string | number }[];
  emitValue?: boolean;
}>();

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: string | number | null | undefined | { label: string; value: string | number }
  ): void;
}>();

const id = props.id || props.label || 'select' + '-1';

const open = ref(false);
function closeOpts() {
  open.value = false;
}

function selectOpt(opt: string | number | { label: string; value: string | number }) {
  if (props.emitValue) {
    emit('update:modelValue', opt.value);
  } else {
    emit('update:modelValue', opt);
  }
  open.value = !open.value;
}

function getMappedOption(opt: string | number) {
  for (let i = 0; i < props.options.length; i++) {
    if (props.options[i].value === opt) return props.options[i].label;
  }
}

onMounted(() => document.addEventListener('click', closeOpts));
onUnmounted(() => document.removeEventListener('click', closeOpts));
</script>

<style scoped>
.sales-select {
  position: relative;
  width: 200px;
}
/* Style the arrow inside the select element: */
.select-selected:after {
  position: absolute;
  content: '';
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #000 transparent transparent transparent;
}
.dark .select-selected:after {
  border-color: #fff transparent transparent transparent;
}
/* style the items (options), including the selected item: */
.select-items div,
.select-selected {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
}
/* Style items (options): */
.select-items {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>
