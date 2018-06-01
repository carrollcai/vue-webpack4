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
    icon: 'el-icon-setting'
  },
  system: {
    name: '系统配置',
    url: '/system',
    icon: 'el-icon-setting'
  }
};

export const INPUT_NUM_MAX = 2000;
