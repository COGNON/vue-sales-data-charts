import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'yearly-sales',
      component: () => import('../views/YearlySales.vue')
    }
  ]
});

export default router;
