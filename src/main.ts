import './assets/main.css';
import 'vue3-easy-data-table/dist/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import DataTable from 'vue3-easy-data-table';
import VueApexCharts from 'vue3-apexcharts';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(VueApexCharts);

app.component('DataTable', DataTable);

app.mount('#app');
