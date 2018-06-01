import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Demo from '@/views/Demo';
import Demo1 from '@/views/Demo1';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/demo1',
      name: 'Demo1',
      component: Demo1
    }
  ]
});
