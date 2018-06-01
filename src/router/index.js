import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Active from '@/views/data-analysis/Active.vue';
import RetentionLoss from '@/views/data-analysis/RetentionLoss.vue';
// import Task from '@/views/data-analysis/Task.vue';
// import System from '@/views/data-analysis/System.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/analysis/active',
      name: 'active',
      component: Active
    },
    {
      path: '/analysis/retention-loss',
      name: 'retention-loss',
      component: RetentionLoss
    }
  ]
});
