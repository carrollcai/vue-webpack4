// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'utils/helper';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import EsopButton from 'components/EsopButton';
import ViserVue from 'viser-vue';

// 这里不能通过import直接引入scss，不支持这个scss后缀格式，需要在App组件style中引入
// import 'scss/index.scss';

Vue.use(ElementUI);
Vue.use(ViserVue);
Vue.config.productionTip = false;
Vue.component('esop-button', EsopButton);

Vue.axios = axios;

// http request 拦截器
Vue.axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
Vue.axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
