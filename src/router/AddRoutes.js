import Login from '@/views/login/Login.vue';
import Container from '@/views/Container.vue';
import Page403 from '@/views/common/Page403.vue';
import Page500 from '@/views/common/Page500.vue';
import Page404 from '@/views/common/Page404.vue';

import Dashboard from '@/views/dashboard/Dashboard.vue';
import Active from '@/views/data-analysis/Active.vue';
import RetentionLoss from '@/views/data-analysis/RetentionLoss.vue';
import DailyLive from '@/views/data-analysis/DailyLive.vue';
import TaskManagement from '@/views/task/Query.vue';
import TaskPush from '@/views/task/Push.vue';
import TaskTodo from '@/views/task/Todo.vue';
import TaskApprove from '@/views/task/Approve.vue';
import TaskQueryDetail from '@/views/task/QueryDetail.vue';
import TaskPushDetail from '@/views/task/PushDetail.vue';
import TaskTodoDetail from '@/views/task/TodoDetail.vue';

import Business from '@/views/business-manage/Business.vue';
import BusinessCreateManage from '@/views/business-manage/BusinessCreateManage.vue';
import BusinessTask from '@/views/business-manage/BusinessTask.vue';
import BusinessDetail from '@/views/business-manage/BusinessDetail.vue';
import CreateBusiness from '@/views/business-manage/CreateBusiness.vue';
import UpdateBusiness from '@/views/business-manage/UpdateBusiness.vue';
import TransforOrder from '@/views/business-manage/TransforOrder.vue';

import GroupCustomerOverview from '@/views/group-customer/Overview.vue';
import GroupCustomerCreateManage from '@/views/group-customer/CustomerCreateManage.vue';
import GroupCustomerAuditManage from '@/views/group-customer/CustomerAuditManage.vue';
import CustomerCreate from '@/views/group-customer/create/CustomerCreate.vue';
import CustomerEdit from '@/views/group-customer/create/CustomerEdit.vue';
import CustomerDetail from '@/views/group-customer/detail/CustomerDetail.vue';

import Role from '@/views/system/Role.vue';
import RoleCreate from '@/views/system/RoleCreate.vue';
import User from '@/views/system/User.vue';
import UserCreate from '@/views/system/UserCreate.vue';

import ProductDetail from '@/views/product/ProductDetail.vue';
import ProductCreatManage from '@/views/product/ProductCreatManage.vue';
import ProductView from '@/views/product/ProductView.vue';
import createBaseInfo from '@/views/product/create/CreateBaseInfo.vue';
import CreateSaleStep01 from '@/views/product/create/CreateSaleStep01.vue';
import CreateSaleStep02 from '@/views/product/create/CreateSaleStep02.vue';

import OrderCreateManage from '@/views/order/CreateManage.vue';
import OrderHandleTask from '@/views/order/HandleTask.vue';
import OrderOverview from '@/views/order/Overview.vue';
import OrderCreate from '@/views/order/OrderCreate.vue';
import OrderOverviewDetail from '@/views/order/OrderOverviewDetail.vue';
import OrderHandleTaskDetail from '@/views/order/HandleTaskDetail.vue';

const staticRoutes = [
  { path: '/login', component: Login, meta: { skipAuth: true } },
  {
    path: '/',
    component: Container,
    children: [
      { path: '/', redirect: '/dashboard' },
      { path: '/500', component: Page500 },
      { path: '/403', component: Page403 }
    ]
  }
];

const dynamicRoutes = [
  {
    path: '/',
    component: Container,
    children: [
      { path: '/dashboard', component: Dashboard, meta: { menuId: 1 } },
      { path: '/analysis/active', component: Active, meta: { menuId: 3 } },
      { path: '/analysis/retention-loss', component: RetentionLoss, meta: { menuId: 4 } },
      { path: '/analysis/daily-live', component: DailyLive },

      {
        path: '/product/product-view',
        name: 'product-view',
        component: ProductView
      },
      {
        path: '/product/product-detail/:id',
        name: 'product-details',
        component: ProductDetail
      },
      {
        path: '/product/product-creat-manage',
        name: 'product-creat-manage',
        component: ProductCreatManage
      },
      {
        path: '/product/create-base-info/:id',
        name: 'create-base-infos',
        component: createBaseInfo
      },
      {
        path: '/product/create-base-info/',
        name: 'create-base-info',
        component: createBaseInfo
      },
      {
        path: '/product/create-sale-step01',
        name: 'create-sale-step01',
        component: CreateSaleStep01
      },
      {
        path: '/product/create-sale-step02',
        name: 'create-sale-step02',
        component: CreateSaleStep02
      },

      { path: '/task/management', component: TaskManagement, meta: { menuId: 6 } },
      { path: '/task/query/detail/:id', component: TaskQueryDetail, meta: { menuId: 6 } },
      { path: '/task/push', component: TaskPush, meta: { menuId: 7 } },
      { path: '/task/todo/push/:id', component: TaskPushDetail, meta: { menuId: 7 } },
      { path: '/task/todo', component: TaskTodo, meta: { menuId: 8 } },
      { path: '/task/todo/detail/:id', component: TaskTodoDetail, meta: { menuId: 8 } },
      { path: '/task/approve', component: TaskApprove, meta: { menuId: 8 } },

      {
        path: '/business-manage/business',
        name: 'business',
        component: Business,
        meta: { menuId: 8 }
      },
      {
        path: '/business-manage/business-detail/:id',
        name: 'business-detail',
        component: BusinessDetail,
        meta: { menuId: 8 }
      },
      {
        path: '/business-manage/business-create-manage',
        name: 'business-create-manage',
        component: BusinessCreateManage,
        meta: { menuId: 9 }
      },
      {
        path: '/business-manage/create-business',
        name: 'create-business',
        component: CreateBusiness,
        meta: { menuId: 9 }
      },
      {
        path: '/business-manage/update-business/:id',
        name: 'update-business',
        component: UpdateBusiness,
        meta: { menuId: 9 }
      },
      {
        path: '/business-manage/business-task',
        name: 'business-task',
        component: BusinessTask,
        meta: { menuId: 10 }
      },
      {
        path: '/business-manage/transfor-order/:id',
        name: 'transfor-order',
        component: TransforOrder,
        meta: { menuId: 10 }
      },
      {
        path: '/group-customer/overview',
        name: 'group-customer-overview',
        component: GroupCustomerOverview,
        meta: { menuId: 13 }
      },
      {
        path: '/group-customer/create-manage',
        name: 'group-customer-create-manage',
        component: GroupCustomerCreateManage,
        meta: { menuId: 14 }
      },
      {
        path: '/group-customer/audit-manage',
        name: 'group-customer-audit-manage',
        component: GroupCustomerAuditManage,
        meta: { menuId: 15 }
      },

      { path: '/system/role/management', component: Role, meta: { menuId: 10 } },
      // type分为create / edit
      { path: '/system/role/:type/:id?', component: RoleCreate, meta: { menuId: 10 } },
      { path: '/system/user/management', component: User, meta: { menuId: 11 } },
      { path: '/system/user/:type/:id?', component: UserCreate, meta: { menuId: 11 } },

      { path: '/order/create-manage', component: OrderCreateManage },
      { path: '/order/manage/:type/:id?', component: OrderCreate },
      { path: '/order/handle-task', component: OrderHandleTask },
      { path: '/order/overview', component: OrderOverview },
      { path: '/order/overview/detail/:id', component: OrderOverviewDetail },
      // type为detail，sign，pay，pedding，fulfilled
      { path: '/order/handle-task/:type/:id', component: OrderHandleTaskDetail },

      { path: '*', component: Page404 }
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
    const routeArr = [
      {
        path: '/group-customer/create',
        name: 'group-customer-create',
        component: CustomerCreate
      },
      {
        path: '/group-customer/edit',
        name: 'group-customer-edit',
        component: CustomerEdit
      },
      {
        path: '/group-customer/detail/:id',
        name: 'group-customer-detail',
        component: CustomerDetail
      }
    ];

    // list为已经扁平化具有menuId的路由
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
