
/**
 * 请求的根路径
 */
export const BASE_URL = 'http://localhost:3618';

/**
 * session持续时间。单位：天
 */
export const SESSION_DURATION = 1 / 72;

export const MENU_PERMISSIONS = [
  {
    menuId: 1,
    name: '首页',
    url: '/dashboard',
    icon: 'icon-home',
    enable: false
  },
  {
    menuId: 2,
    name: '数据分析',
    url: '/analysis',
    icon: 'icon-data',
    enable: false,
    children: [
      {
        menuId: 3,
        parentId: 2,
        name: '活跃度分析',
        url: '/analysis/active',
        enable: false
      },
      {
        menuId: 4,
        parentId: 2,
        name: '留存流失分析',
        url: '/analysis/retention-loss',
        enable: false
      }
    ]
  },
  // {
  //   menuId: 5,
  //   name: '任务管理',
  //   url: '/task',
  //   icon: 'icon-task',
  //   enable: false,
  //   children: [
  //     {
  //       menuId: 6,
  //       parentId: 5,
  //       name: '任务查询',
  //       url: '/task/management',
  //       enable: false
  //     },
  //     {
  //       menuId: 7,
  //       parentId: 5,
  //       name: '我的申请',
  //       url: '/task/push',
  //       enable: false
  //     },
  //     {
  //       menuId: 8,
  //       parentId: 5,
  //       name: '我的待办',
  //       url: '/task/todo',
  //       enable: false
  //     }
  //   ]
  // },
  {
    menuId: 12,
    name: '订单管理',
    url: '/order',
    icon: 'icon-task',
    enable: false,
    children: [
      {
        menuId: 13,
        parentId: 12,
        name: '订单总览',
        url: '/order/overview',
        enable: false
      },
      {
        menuId: 14,
        parentId: 12,
        name: '订单创建管理',
        url: '/order/create-manage',
        enable: false
      },
      {
        menuId: 15,
        parentId: 12,
        name: '订单处理任务',
        url: '/order/handle-task',
        enable: false
      }
    ]
  },
  {
    menuId: 16,
    name: '产品管理',
    icon: 'icon-product',
    url: '/product',
    enable: false,
    children: [
      {
        menuId: 17,
        parentId: 16,
        name: '产品总览',
        url: '/product/product-view',
        enable: false
      },
      {
        menuId: 18,
        parentId: 16,
        name: '产品创建管理',
        url: '/product/product-creat-manage',
        enable: false
      }
    ]
  },
  {
    menuId: 19,
    name: '商机管理',
    url: '/business',
    icon: 'icon-business',
    enable: false,
    children: [
      {
        menuId: 20,
        parentId: 19,
        name: '商机总览',
        url: '/business-manage/business',
        enable: false
      },
      {
        menuId: 21,
        parentId: 19,
        name: '商机创建管理',
        url: '/business-manage/business-create-manage',
        enable: false
      },
      {
        menuId: 22,
        parentId: 19,
        name: '商机处理任务',
        url: '/business-manage/business-task',
        enable: false
      }
    ]
  },
  {
    menuId: 23,
    name: '集团客户管理',
    url: '/group-customer',
    icon: 'el-icon-service',
    enable: false,
    children: [
      {
        menuId: 24,
        parentId: 23,
        name: '集团客户总览',
        url: '/group-customer/overview',
        enable: false
      },
      {
        menuId: 25,
        parentId: 23,
        name: '集团客户创建',
        url: '/group-customer/create-manage',
        enable: false
      },
      {
        menuId: 26,
        parentId: 23,
        name: '集团客户审核',
        url: '/group-customer/audit-manage',
        enable: false
      }
    ]
  },
  {menuId: 27,
    name: '客户需求管理',
    url: '/requirement',
    icon: 'icon-business',
    enable: false,
    children: [
      {
        menuId: 28,
        parentId: 27,
        name: '需求创建管理',
        url: '/requirement/manage',
        enable: false
      },
      {
        menuId: 29,
        parentId: 27,
        name: '需求任务处理',
        url: '/requirement/list',
        enable: false
      }
    ]
  },
  {
    menuId: 30,
    name: '走访管理',
    url: '/visit',
    icon: 'icon-business',
    enable: false,
    children: [
      {
        menuId: 31,
        parentId: 30,
        name: '我的走访管理',
        url: '/visit/my-visit-manage',
        enable: false
      },
      {
        menuId: 32,
        parentId: 30,
        name: '走访指派',
        url: '/visit/visit-appoint',
        enable: false
      },
      {
        menuId: 33,
        parentId: 30,
        name: '走访任务处理',
        url: '/visit/mission-handling',
        enable: false
      }
    ]
  },
  {
    menuId: 9,
    name: '系统配置',
    url: '/system',
    icon: 'el-icon-setting',
    enable: false,
    children: [
      {
        menuId: 10,
        parentId: 9,
        name: '角色管理',
        url: '/system/role/management',
        enable: false
      },
      {
        menuId: 11,
        parentId: 9,
        name: '用户管理',
        url: '/system/user/management',
        enable: false
      }
    ]
  }
];

export const PAGE_NO = 1;
export const PAGE_SIZE = 20;

export const TREND_RADIO = {
  0: '日活跃用户数',
  1: '手机账号登录用户',
  2: '移动IP用户 / 非移动IP用户',
  3: '新增会员用户'
};

export const RETENTION_TREND_RADIO = {
  0: '新增用户留存率',
  1: '留存用户流失率'
};

/* rules 限制 */
// 时间限制
export const DATE_LIMIT = 30;
export const MONTH_LIMIT = 12;
export const INPUT_NUM_MAX = 2000;
export const INPUT_TEXT_LIMIT = 15;
export const INPUT_TEXTAREA_LIMIT = 50;
export const FILE_UPLOAD_LIMIT = 5;

export const CLIENT = [
  {
    'key': 1,
    'value': '咪咕视频'
  },
  {
    'key': 2,
    'value': '咪咕直播'
  },
  {
    'key': 3,
    'value': '咪咕影院'
  }
  // 20180705，暂时屏蔽，客户端渠道还没开通
  // {
  //   'key': 4,
  //   'value': '咪咕阅读'
  // },
  // {
  //   'key': 5,
  //   'value': '咪咕音乐'
  // },
  // {
  //   'key': 6,
  //   'value': '咪咕游戏'
  // },
  // {
  //   'key': 7,
  //   'value': '咪咕圈圈'
  // },
  // {
  //   'key': 8,
  //   'value': '咪咕善跑'
  // },
  // {
  //   'key': 9,
  //   'value': '咪咕灵犀'
  // }
];

export const ORDER_STATUS = {
  1: '草稿',
  2: '待签约',
  3: '待付款',
  4: '已完成',
  5: '已取消'
};
