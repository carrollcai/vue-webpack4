import Login from '@/views/login/Login.vue';
import Container from '@/views/Container.vue';
import Page403 from '@/views/common/Page403.vue';
import Page500 from '@/views/common/Page500.vue';
import Page404 from '@/views/common/Page404.vue';

import Dashboard from '@/views/dashboard/Dashboard.vue';
import Active from '@/views/data-analysis/Active.vue';
import RetentionLoss from '@/views/data-analysis/RetentionLoss.vue';
import DailyLive from '@/views/data-analysis/DailyLive.vue';

// import TaskManagement from '@/views/task/Query.vue';
// import TaskPush from '@/views/task/Push.vue';
// import TaskTodo from '@/views/task/Todo.vue';
// import TaskApprove from '@/views/task/Approve.vue';
// import TaskQueryDetail from '@/views/task/QueryDetail.vue';
// import TaskPushDetail from '@/views/task/PushDetail.vue';
// import TaskTodoDetail from '@/views/task/TodoDetail.vue';

import Business from '@/views/business-manage/Business.vue';
import BusinessCreateManage from '@/views/business-manage/BusinessCreateManage.vue';
import BusinessTask from '@/views/business-manage/BusinessTask.vue';
import BusinessDetail from '@/views/business-manage/BusinessDetail.vue';
import CreateBusiness from '@/views/business-manage/CreateBusiness.vue';
import UpdateBusiness from '@/views/business-manage/UpdateBusiness.vue';
import TransforOrder from '@/views/business-manage/TransforOrder.vue';

import GroupCustomerOverview from '@/views/group-customer/Overview.vue';
import OverviewDetail from '@/views/group-customer/OverviewDetail.vue';
import OverviewDetailMore from '@/views/group-customer/OverviewDetailMore.vue';
import GroupCustomerCreateManage from '@/views/group-customer/CustomerCreateManage.vue';
import GroupCustomerAuditManage from '@/views/group-customer/CustomerAuditManage.vue';
import CustomerCreate from '@/views/group-customer/create/CustomerCreate.vue';
import CustomerEdit from '@/views/group-customer/create/CustomerEdit.vue';
import CustomerDetail from '@/views/group-customer/detail/CustomerDetail.vue';
import CustomerAudit from '@/views/group-customer/detail/CustomerAudit.vue';
import CustomerAuditDetail from '@/views/group-customer/detail/CustomerAuditDetail.vue';

/* 客户需求 */
import RequirementManagement from '@/views/requirement/management/RequirementManagement.vue';
import RequirementHandleList from '@/views/requirement/management/RequirementHandleList.vue';
import RequirementCreate from '@/views/requirement/create/RequirementCreate.vue';

import Role from '@/views/system/Role.vue';
import RoleCreate from '@/views/system/RoleCreate.vue';
import User from '@/views/system/User.vue';
import UserCreate from '@/views/system/UserCreate.vue';

import ProductDetail from '@/views/product/ProductDetail.vue';
import ProductCreatManage from '@/views/product/ProductCreatManage.vue';
import ProductView from '@/views/product/ProductView.vue';
import createBaseInfo from '@/views/product/create/CreateBaseInfo.vue';
import CreateSaleStep from '@/views/product/create/CreateSaleStep.vue';

import OrderCreateManage from '@/views/order/CreateManage.vue';
import OrderHandleTask from '@/views/order/HandleTask.vue';
import OrderOverview from '@/views/order/Overview.vue';
import OrderCreate from '@/views/order/OrderCreate.vue';
import OrderOverviewDetail from '@/views/order/OrderOverviewDetail.vue';
import OrderHandleTaskDetail from '@/views/order/HandleTaskDetail.vue';

import MissionHandling from '@/views/visit/MissionHandling.vue';
import MyVisitManage from '@/views/visit/MyVisitManage.vue';
import VisitAppoint from '@/views/visit/VisitAppoint.vue';
import CreateVisitApplication from '@/views/visit/CreateVisitApplication.vue';
import ExecuteProcess from '@/views/visit/ExecuteProcess.vue';
import MyVisitView from '@/views/visit/MyVisitView.vue';

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
        component: ProductView,
        meta: { menuId: 17 }
      },
      {
        path: '/product/product-detail/:id',
        name: 'product-details',
        component: ProductDetail
      },
      {
        path: '/product/product-creat-manage',
        name: 'product-creat-manage',
        component: ProductCreatManage,
        meta: { menuId: 18 }
      },
      {
        path: '/product/create-base-info/:id',
        name: 'create-base-infos',
        component: createBaseInfo,
        meta: { menuId: 18 }
      },
      {
        path: '/product/create-base-info/',
        name: 'create-base-info',
        component: createBaseInfo,
        meta: { menuId: 18 }
      },
      {
        path: '/product/create-sale-step/',
        name: 'create-sale-step',
        component: CreateSaleStep,
        meta: { menuId: 18 }
      },
      {
        path: '/product/create-sale-step/:id',
        name: 'create-sale-step',
        component: CreateSaleStep,
        meta: { menuId: 18 }
      },

      // { path: '/task/management', component: TaskManagement, meta: { menuId: 6 } },
      // { path: '/task/query/detail/:id', component: TaskQueryDetail, meta: { menuId: 6 } },
      // { path: '/task/push', component: TaskPush, meta: { menuId: 7 } },
      // { path: '/task/todo/push/:id', component: TaskPushDetail, meta: { menuId: 7 } },
      // { path: '/task/todo', component: TaskTodo, meta: { menuId: 8 } },
      // { path: '/task/todo/detail/:id', component: TaskTodoDetail, meta: { menuId: 8 } },
      // { path: '/task/approve', component: TaskApprove, meta: { menuId: 8 } },

      {
        path: '/business-manage/business',
        name: 'business',
        component: Business,
        meta: { menuId: 20 }
      },
      {
        path: '/business-manage/business-detail/:opporId',
        name: 'business-detail',
        component: BusinessDetail,
        meta: { menuId: 20 }
      },
      {
        path: '/business-manage/business-create-manage',
        name: 'business-create-manage',
        component: BusinessCreateManage,
        meta: { menuId: 21 }
      },
      {
        path: '/business-manage/create-business',
        name: 'create-business',
        component: CreateBusiness,
        meta: { menuId: 21 }
      },
      {
        path: '/business-manage/update-business/:opporId',
        name: 'update-business',
        component: UpdateBusiness,
        meta: { menuId: 21 }
      },
      {
        path: '/business-manage/business-task',
        name: 'business-task',
        component: BusinessTask,
        meta: { menuId: 22 }
      },
      {
        path: '/business-manage/transfor-order/:opporId/:taskInsId',
        name: 'transfor-order',
        component: TransforOrder,
        meta: { menuId: 22 }
      },
      {
        path: '/group-customer/overview',
        name: 'group-customer-overview',
        component: GroupCustomerOverview,
        meta: { menuId: 24 }
      },
      {
        path: '/group-customer/overview/detail/:id',
        name: 'group-customer-overview-detail',
        component: OverviewDetail,
        meta: { menuId: 24 }
      },
      {
        path: '/group-customer/overview/detail/:id/more',
        name: 'group-customer-overview-detail-more',
        component: OverviewDetailMore,
        meta: { menuId: 24 }
      },
      {
        path: '/group-customer/create-manage',
        name: 'group-customer-create-manage',
        component: GroupCustomerCreateManage,
        meta: { menuId: 25 }
      },
      {
        path: '/group-customer/create',
        name: 'group-customer-create',
        component: CustomerCreate,
        meta: { menuId: 25 }
      },
      {
        path: '/group-customer/edit/:id',
        name: 'group-customer-edit',
        component: CustomerEdit,
        meta: { menuId: 25 }
      },
      {
        path: '/group-customer/detail/:id',
        name: 'group-customer-detail',
        component: CustomerDetail,
        meta: { menuId: 25 }
      },
      {
        path: '/group-customer/audit-manage',
        name: 'group-customer-audit-manage',
        component: GroupCustomerAuditManage,
        meta: { menuId: 26 }
      },
      {
        path: '/group-customer/audit/detail/:id',
        name: 'group-customer-audit-detail',
        component: CustomerAuditDetail,
        meta: { menuId: 26 }
      },
      {
        path: '/group-customer/audit/:id/:taskId',
        name: 'group-customer-audit',
        component: CustomerAudit,
        meta: { menuId: 26 }
      },

      {
        path: '/requirement/manage',
        name: 'requirement-manage',
        component: RequirementManagement,
        meta: { menuId: 28 }
      },
      {
        path: '/requirement/create',
        name: 'requirement-create',
        component: RequirementCreate,
        meta: { menuId: 28 }
      },
      {
        path: '/requirement/list',
        name: 'requirement-list',
        component: RequirementHandleList,
        meta: { menuId: 29 }
      },

      {
        path: '/visit/mission-handling',
        name: 'visit-mission-handling',
        component: MissionHandling,
        meta: { menuId: 14 }
      },
      {
        path: '/visit/my-visit-manage',
        name: 'visit-my-manage',
        component: MyVisitManage,
        meta: { menuId: 15 }
      },
      {
        path: '/visit/my-visit-manage',
        name: 'visit-my-manage',
        component: MyVisitManage,
        meta: { menuId: 15 }
      },
      {
        path: '/visit/visit-appoint',
        name: 'visit-appoint',
        component: VisitAppoint,
        meta: { menuId: 15 }
      },
      {
        path: '/visit/create-visit-application',
        name: 'create-visit-application',
        component: CreateVisitApplication,
        meta: { menuId: 15 }
      },
      {
        path: '/visit/execute-process',
        name: 'execute-process',
        component: ExecuteProcess,
        meta: { menuId: 15 }
      },
      {
        path: '/visit/my-visit-view',
        name: 'my-visit-view',
        component: MyVisitView,
        meta: { menuId: 15 }
      },

      { path: '/system/role/management', component: Role, meta: { menuId: 10 } },
      // type分为create / edit
      { path: '/system/role/:type/:id?', component: RoleCreate, meta: { menuId: 10 } },
      { path: '/system/user/management', component: User, meta: { menuId: 11 } },
      { path: '/system/user/:type/:id?', component: UserCreate, meta: { menuId: 11 } },

      { path: '/order/overview', component: OrderOverview, meta: { menuId: 13 } },
      { path: '/order/overview/detail/:id/:processId?', component: OrderOverviewDetail, meta: { menuId: 13 } },
      { path: '/order/create-manage', component: OrderCreateManage, meta: { menuId: 14 } },
      { path: '/order/manage/:type/:id?', component: OrderCreate, meta: { menuId: 14 } },
      { path: '/order/create-manage/detail/:id/:processId?', component: OrderOverviewDetail, meta: { menuId: 14 } },
      { path: '/order/handle-task', component: OrderHandleTask, meta: { menuId: 15 } },
      // type为detail，sign，pay，detail-sign，detail-pay
      { path: '/order/handle-task/:type/:id', component: OrderHandleTaskDetail, meta: { menuId: 15 } },

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
