import Login from '@/views/login/Login.vue';
import Container from '@/views/Container.vue';
import Page403 from '@/views/common/Page403.vue';
import Page500 from '@/views/common/Page500.vue';
import Page404 from '@/views/common/Page404.vue';

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

const staticRoutes = [
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
    component: Container,
    children: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/500',
        component: Page500
      },
      {
        path: '/403',
        component: Page403
      }
    ]
  }
];

const dynamicRoutes = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { menuId: 1 }
      },
      {
        path: '/analysis/active',
        name: 'active',
        component: Active,
        meta: { menuId: 3 }
      },
      {
        path: '/analysis/retention-loss',
        name: 'retention-loss',
        component: RetentionLoss,
        meta: { menuId: 4 }
      },
      {
        path: '/analysis/daily-live',
        name: 'daily-live',
        component: DailyLive
      },
      {
        path: '/task/management',
        name: 'task-management',
        component: TaskManagement,
        meta: { menuId: 6 }
      },
      {
        path: '/task/push',
        name: 'task-push',
        component: TaskPush,
        meta: { menuId: 7 }
      },
      {
        path: '/task/todo/push/:id',
        name: 'task-push-detail',
        component: TaskPushDetail,
        meta: { menuId: 7 }
      },
      {
        path: '/task/todo',
        name: 'task-todo',
        component: TaskTodo,
        meta: { menuId: 8 }
      },
      {
        path: '/task/todo/detail/:id',
        name: 'task-todo-detail',
        component: TaskTodoDetail,
        meta: { menuId: 8 }
      },
      {
        path: '/task/approve',
        name: 'task-approve',
        component: TaskApprove,
        meta: { menuId: 8 }
      },
      {
        path: '/system/role/management',
        name: 'role',
        component: Role,
        meta: { menuId: 10 }
      },
      // type分为create / edit
      {
        path: '/system/role/:type/:id?',
        name: 'role-create',
        component: RoleCreate,
        meta: { menuId: 10 }
      },
      {
        path: '/system/user/management',
        name: 'user',
        component: User,
        meta: { menuId: 11 }
      },
      {
        path: '/system/user/:type/:id?',
        name: 'user-create',
        component: UserCreate,
        meta: { menuId: 11 }
      },
      {
        path: '*',
        component: Page404
      }
    ]
  }
];
class AddRoutes {
  constructor() {
    this._dynamicRoutes = dynamicRoutes[0].children;
    this.staticRoutes = staticRoutes;
  }

  addDynamicRoutes(list) {
    let newRoutes = [{
      path: '/',
      component: Container,
      children: []
    }];
    const routeArr = [];

    // 已经扁平化具有menuId的路由
    this._dynamicRoutes.map(val => {
      if (!val.meta || (val.meta && !val.meta.menuId)) {
        routeArr.push(val);
        return false;
      }
      list.map(cval => {
        if (val.meta.menuId === cval) {
          routeArr.push(val);
        }
      });
    });
    newRoutes[0].children = routeArr;
    return newRoutes;
  }
};
export default AddRoutes;
