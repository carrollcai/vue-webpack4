// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'utils/helper';

import App from './App';
import router from './router';
import store from './store';
import auth from './auth';
import EsopButton from 'components/EsopButton.vue';
import FormCancel from 'components/FormCancel.vue';
import '@/assets/font/style.css';

import './utils/http';

// 这里不能通过import直接引入scss，不支持这个scss后缀格式，需要在App组件style中引入
// import 'scss/index.scss';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component('esop-button', EsopButton);
Vue.component('form-cancel', FormCancel);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  auth,
  components: { App },
  template: '<App/>'
});
