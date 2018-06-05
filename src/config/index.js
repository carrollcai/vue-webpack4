export const SIDEBAR_DATA = {
  dashboard: {
    name: '首页',
    url: '/dashboard',
    icon: 'el-icon-menu'
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
        name: '我的任务',
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
