
/**
 * 请求的根路径
 */
export const BASE_URL = 'http://localhost:3618';

/**
 * session持续时间。单位：天
 */
export const SESSION_DURATION = 1 / 72;

export const SIDEBAR_DATA = {
  dashboard: {
    menuId: 1,
    name: '首页',
    url: '/dashboard',
    icon: 'icon-home',
    enable: false
  },
  analysis: {
    menuId: 2,
    name: '数据分析',
    url: '/analysis',
    icon: 'icon-data',
    enable: false,
    children: [
      {
        menuId: 3,
        name: '活跃度分析',
        url: '/analysis/active',
        enable: false
      },
      {
        menuId: 4,
        name: '留存流失分析',
        url: '/analysis/retention-loss',
        enable: false
      }
    ]
  },
  task: {
    menuId: 5,
    name: '任务管理',
    url: '/task',
    icon: 'icon-task',
    enable: false,
    children: [
      {
        menuId: 6,
        name: '任务查询',
        url: '/task/management',
        enable: false
      },
      {
        menuId: 7,
        name: '我的申请',
        url: '/task/push',
        enable: false
      },
      {
        menuId: 8,
        name: '我的待办',
        url: '/task/todo',
        enable: false
      }
    ]
  },
  system: {
    menuId: 9,
    name: '系统配置',
    url: '/system',
    icon: 'el-icon-setting',
    enable: false,
    children: [
      {
        menuId: 10,
        name: '角色管理',
        url: '/system/role/management',
        enable: false
      },
      {
        menuId: 11,
        name: '用户管理',
        url: '/system/user/management',
        enable: false
      }
    ]
  }
};

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
export const INPUT_TEXT_LIMIT = 80;
export const INPUT_TEXTAREA_LIMIT = 100;

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
    'value': '咪咕影视'
  },
  {
    'key': 4,
    'value': '咪咕阅读'
  },
  {
    'key': 5,
    'value': '咪咕音乐'
  },
  {
    'key': 6,
    'value': '咪咕游戏'
  },
  {
    'key': 7,
    'value': '咪咕圈圈'
  },
  {
    'key': 8,
    'value': '咪咕善跑'
  },
  {
    'key': 9,
    'value': '咪咕灵犀'
  }
];

export const MENU_PERMISSIONS = [
  {
    'menuId': 1,
    'name': '首页'
  },
  {
    'menuId': 2,
    'name': '数据分析',
    'children': [
      {
        'menuId': 3,
        'parentId': 2,
        'name': '活跃度分析'
      },
      {
        'menuId': 4,
        'parentId': 2,
        'name': '留存流失分析'
      }
    ]
  },
  {
    'menuId': 5,
    'name': '任务管理',
    'children': [
      {
        'menuId': 6,
        'parentId': 5,
        'name': '任务查询'
      },
      {
        'menuId': 7,
        'parentId': 5,
        'name': '我的申请'
      },
      {
        'menuId': 8,
        'parentId': 5,
        'name': '我的待办'
      }
    ]
  },
  {
    'menuId': 9,
    'name': '系统配置',
    'children': [
      {
        'menuId': 10,
        'parentId': 9,
        'name': '角色管理'
      },
      {
        'menuId': 11,
        'parentId': 9,
        'name': '用户管理'
      }
    ]
  }
];
