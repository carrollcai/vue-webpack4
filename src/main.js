import Vue from 'vue';
import ElementUI from 'element-ui';
import 'utils/helper';
import App from './App';
import router from './router';
import store from './store';
import FormCancel from 'components/FormCancel.vue';
import '@/assets/font/iconfont.css';
import VueClipboard from 'vue-clipboard2';

// 这里不能通过import直接引入scss，不支持这个scss后缀格式，需要在App组件style中引入
// import 'scss/index.scss';

Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
Vue.component('form-cancel', FormCancel);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
