import Vue from 'vue';
import Router from 'vue-router';

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

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
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
