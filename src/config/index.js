export const SIDEBAR_DATA = {
  dashboard: {
    name: '首页',
    url: '/dashboard',
    icon: 'icon-download'
  },
  analysis: {
    name: '数据分析',
    url: '/analysis',
    icon: 'el-icon-setting',
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
    icon: 'el-icon-setting',
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

export const INPUT_NUM_MAX = 2000;

export const PAGE_NO = 1;
export const PAGE_SIZE = 20;

export const TREND_RADIO = {
  0: '日活跃用户数',
  1: '手机账号登录用户',
  2: '移动IP用户/非移动IP用户',
  3: '新增会员用户'
};
