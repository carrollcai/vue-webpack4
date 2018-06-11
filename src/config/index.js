
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
    name: '首页',
    url: '/dashboard',
    icon: 'icon-home'
  },
  analysis: {
    name: '数据分析',
    url: '/analysis',
    icon: 'icon-data',
    children: [
      {
        name: '活跃度分析',
        url: '/analysis/active'
      },
      {
        name: '留存流失分析',
        url: '/analysis/retention-loss'
      }
    ]
  },
  task: {
    name: '任务管理',
    url: '/task',
    icon: 'icon-task',
    children: [
      {
        name: '任务查询',
        url: '/task/management'
      },
      {
        name: '我的申请',
        url: '/task/push'
      },
      {
        name: '我的待办',
        url: '/task/todo'
      }
    ]
  },
  system: {
    name: '系统配置',
    url: '/system',
    icon: 'el-icon-setting',
    children: [
      {
        name: '角色管理',
        url: '/system/role/management'
      },
      {
        name: '用户管理',
        url: '/system/user/management'
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
