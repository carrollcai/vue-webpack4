import Vue from 'vue';
import Router from 'vue-router';
// import Cookies from 'js-cookie';
// import store from '@/store';
// import { SESSION_DURATION } from '@/config';

import Login from '@/views/login/Login.vue';
import CommonView from '@/views/CommonView.vue';

import Page404 from '@/views/common/Page404.vue';
import Page403 from '@/views/common/Page403.vue';
import Page500 from '@/views/common/Page500.vue';

import Dashboard from '@/views/dashboard/Dashboard.vue';
import Active from '@/views/data-analysis/Active.vue';
import RetentionLoss from '@/views/data-analysis/RetentionLoss.vue';
import DailyLive from '@/views/data-analysis/DailyLive.vue';
import TaskManagement from '@/views/task/Management.vue';
import TaskPush from '@/views/task/Push.vue';
import TaskTodo from '@/views/task/Todo.vue';
import TaskApprove from '@/views/task/Approve.vue';
import TaskPushDetail from '@/views/task/PushDetail.vue';
import TaskTodoDetail from '@/views/task/TodoDetail.vue';

import Role from '@/views/system/Role.vue';
import RoleCreate from '@/views/system/RoleCreate.vue';
import User from '@/views/system/User.vue';
import UserCreate from '@/views/system/UserCreate.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        skipAuth: true
      },
      component: Login
    },
    {
      path: '/',
      component: CommonView,
      children: [
        {
          path: '/',
          redirect: '/dashboard'
        },
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
        },
        {
          path: '/analysis/daily-live',
          name: 'daily-live',
          component: DailyLive
        },
        {
          path: '/task/management',
          name: 'task-management',
          component: TaskManagement
        },
        {
          path: '/task/push',
          name: 'task-push',
          component: TaskPush
        },
        {
          path: '/task/todo/push/:id',
          name: 'task-push-detail',
          component: TaskPushDetail
        },
        {
          path: '/task/todo',
          name: 'task-todo',
          component: TaskTodo
        },
        {
          path: '/task/todo/detail/:id',
          name: 'task-todo-detail',
          component: TaskTodoDetail
        },
        {
          path: '/task/approve',
          name: 'task-approve',
          component: TaskApprove
        },
        {
          path: '/system/role/management',
          name: 'role',
          component: Role
        },
        {
          path: '/system/user/management',
          name: 'user',
          component: User
        },
        // type分为create / edit
        {
          path: '/system/role/:type/:id?',
          name: 'role-create',
          component: RoleCreate
        },
        // {
        //   path: '/system/role/edit/:id',
        //   name: 'role-edit',
        //   component: RoleCreate
        // },
        {
          path: '/system/user/:type/:id?',
          name: 'user-create',
          component: UserCreate
        },
        {
          path: '/500',
          component: Page500
        },
        {
          path: '/403',
          component: Page403
        },
        {
          path: '*',
          component: Page404
        }
      ]
    }
  ]
});

/*
router.beforeEach((to, from, next) => {
  if (!to.meta.skipAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.isLoggedIn) {
      let token = Cookies.get('token');

      // token 对应的cookie在有效期内
      if (token) {
        // 每次跳转路由，刷新token cookie
        Cookies.set('token', token, { expires: SESSION_DURATION });
        next();
      } else {
        // 当页面长时间没操作时， state中的登录状态还存在，但是，token对应的cookie已经失效
        // cookie失效后，跳转到登录页面
        store.dispatch('toLoginPage');
      }
    } else {
      store.dispatch('toLoginPage');
    }
  } else {
    next();
  }
});
*/

export default router;
