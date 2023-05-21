<template>
  <main>
    <div class="flex gap-x-2 items-center">
      <svg-icon class="cursor-pointer" type="mdi" :path="mdiThemeLightDark" @click="changeTheme" />
      <sales-select v-model="year" label="Year" :options="[2005, 2004, 2003]" />
      <sales-select
        v-model="month"
        label="Month"
        :options="[...[{ label: 'All', value: 0 }], ...monthsAsArray]"
        emit-value
      />
    </div>

    <div class="flex my-5 gap-4">
      <div class="flex grow flex-col justify-center" :class="cardClass">
        <p>
          <span class="text-4xl">$</span>
          <span class="text-6xl">{{ revenueInMillions }}</span>
        </p>
        <p class="text-xl">Revenue this year</p>
        <progress-bar :max="chartData.ytdTarget" :val="chartData.ytd" do-labels />
      </div>

      <by-product :class="cardClass" :data="chartData.yearByProduct" is-currency />

      <div class="flex grow flex-col justify-center" :class="cardClass">
        <p class="text-6xl">{{ unitsSoldFormatted }}</p>
        <p class="text-3xl">Units sold this year</p>
      </div>

      <by-product :class="cardClass" :data="chartData.yearByProductUnit" is-currency />
    </div>

    <div class="flex my-2 gap-4">
      <div class="grow" :class="cardClass">
        <sales-linear-chart
          :series="monthlySalesOptions.series"
          title="Monthly Sales"
          :labels="Object.values(numToMonth)"
          :options="monthlySalesOptions.options"
        />
      </div>

      <div class="grow" :class="cardClass">
        <sales-linear-chart
          :series="monthlySalesByProductOptions.series"
          title="By Product"
          type="line"
          :labels="Object.values(numToMonth)"
          :options="monthlySalesByProductOptions.options"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import sales from '../sales_data_sample.json';
import SalesLinearChart from '../components/SalesLinearChart.vue';
import { getSalesChartData, numToMonth, numToMillions } from '../utils/utils';
import { ChartOpts, ChartData } from '../utils/types';
import ProgressBar from '../components/ProgressBar.vue';
import SalesSelect from '../components/SalesSelect.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiThemeLightDark } from '@mdi/js';
import { darkMode } from '../stores/darkMode';
import ByProduct from '../components/ByProduct.vue';

const cardClass = 'bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mx-2';

const month = ref(0);
const year = ref(2005);

const chartData = computed<ChartData>(() => getSalesChartData(sales, year.value, month.value));

const monthlySalesOptions = computed<ChartOpts>(() => {
  return {
    options: {
      yaxis: { decimalsInFloat: 0 },
      dataLabels: { enabled: false },
      theme: { mode: darkMode.value ? 'dark' : 'light' },
      chart: { background: 'none' }
    },
    series: [
      {
        name: String(year.value),
        data: chartData.value.salesByMonth
      }
    ]
  };
});

const monthlySalesByProductOptions = computed<ChartOpts>(() => {
  return {
    options: {
      yaxis: { decimalsInFloat: 0 },
      dataLabels: { enabled: false },
      theme: { mode: darkMode.value ? 'dark' : 'light' },
      chart: { background: 'none' }
    },
    series: Object.entries(chartData.value.productSalesByMonth).map(([key, value]) => {
      return { name: key, data: value };
    })
  };
});

const revenueInMillions = computed(() => numToMillions(chartData.value.ytd));
const unitsSoldFormatted = computed(() =>
  Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
    chartData.value.unitsSold
  )
);

const monthsAsArray = Object.entries(numToMonth).map((val) => {
  return { label: val[1], value: val[0] };
});

function changeTheme() {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
</script>
