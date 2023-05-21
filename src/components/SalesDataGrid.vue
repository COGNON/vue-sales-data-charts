<template>
  <data-table
    :headers="columns"
    :items="data"
    buttons-pagination
    multi-sort
    :table-height="height || 700"
  >
    <template #item-MONTH_ID="item">
      {{ numToMonth[item.MONTH_ID] }}
    </template>
  </data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SalesData } from '../utils/types';
import { numToMonth } from '../utils/utils';

const props = defineProps<{ data: SalesData[]; columns?: string[]; height?: number }>();

const baseColumns = [
  { value: 'ORDERNUMBER', text: 'Order #', width: 100 },
  { value: 'QUANTITYORDERED', text: 'Quantity' },
  { value: 'PRICEEACH', text: 'Price Each', width: 80 },
  { value: 'SALES', text: 'Sales' },
  { value: 'ORDERDATE', text: 'Order Date', width: 120 },
  { value: 'STATUS', text: 'Status' },
  { value: 'QTR_ID', text: 'QTR' },
  { value: 'MONTH_ID', text: 'Month' },
  { value: 'YEAR_ID', text: 'Year' },
  { value: 'PRODUCTLINE', text: 'Product' },
  { value: 'PRODUCTCODE', text: 'Product Code', width: 100 },
  { value: 'CUSTOMERNAME', text: 'Customer', width: 200 }
];

const columns = computed(() => {
  const tmpCols = baseColumns.map((col) => Object.assign({}, colDefaults, col));

  if (!props.columns) return tmpCols;

  return tmpCols.flatMap((col) => (props.columns.includes(col.value) ? col : []));
});

const colDefaults = { sortable: true };
</script>
