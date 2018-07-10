import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import store from '@/store';
import AddRoutes from './AddRoutes';

Vue.use(Router);

// 用menuId控制权限，路由动态加载，需要在dynamicRoutes字段中添加动态路由
const router = new Router({
  routes: new AddRoutes().staticRoutes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.skipAuth) {
    // this route requires auth, check if logged in,if not, redirect to login page.
    let token = Cookies.get('loginToken');

    if (token) {
      if (!store.state.root.currentUser.menuList.length) {
        (async () => {
          await store.dispatch('getProvince');
          await store.dispatch('getCurrentUserInfo');

          // 获取用户信息后添加动态路由
          await store.commit('ADD_ROUTES');

          store.dispatch('queryStaticData');

          // replace重新获取route对象
          await next({ ...to, replace: true });
        })();
      } else {
        next();
      }
    } else {
      store.dispatch('toLoginPage');
    }
  } else {
    next();
  }
});

export default router;
