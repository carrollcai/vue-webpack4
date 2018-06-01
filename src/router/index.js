import Vue from 'vue';
import Router from 'vue-router';
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
    {
      path: '/system/role/create',
      name: 'role-create',
      component: RoleCreate
    },
    {
      path: '/system/role/edit/:id',
      name: 'role-edit',
      component: RoleCreate
    },
    {
      path: '/system/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/system/user/edit/:id',
      name: 'role-user',
      component: UserCreate
    }
  ]
});
