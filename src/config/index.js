
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
  {
    menuId: 5,
    name: '任务管理',
    url: '/task',
    icon: 'icon-task',
    enable: false,
    children: [
      {
        menuId: 6,
        parentId: 5,
        name: '任务查询',
        url: '/task/management',
        enable: false
      },
      {
        menuId: 7,
        parentId: 5,
        name: '我的申请',
        url: '/task/push',
        enable: false
      },
      {
        menuId: 8,
        parentId: 5,
        name: '我的待办',
        url: '/task/todo',
        enable: false
      }
    ]
  },
  {
    menuId: 4,
    name: '订单管理',
    url: '/order',
    icon: 'icon-task',
    enable: false,
    children: [
      {
        menuId: 4,
        name: '订单总览',
        url: '/order/overview',
        enable: false
      },
      {
        menuId: 4,
        name: '订单创建管理',
        url: '/order/create-manage',
        enable: false
      },
      {
        menuId: 4,
        name: '订单处理任务',
        url: '/order/handle-task',
        enable: false
      }
    ]
  },
  {
    menuId: 6,
    name: '产品管理',
    icon: 'icon-product',
    url: '/product',
    enable: false,
    children: [
      {
        menuId: 9,
        parentId: 6,
        name: '产品总览',
        url: '/product/product-view',
        enable: false
      },
      {
        menuId: 10,
        parentId: 6,
        name: '产品创建管理',
        url: '/product/product-creat-manage',
        enable: false
      }
    ]
  },
  {
    menuId: 7,
    name: '商机管理',
    url: '/business',
    icon: 'icon-business',
    enable: false,
    children: [
      {
        menuId: 8,
        parentId: 7,
        name: '商机总览',
        url: '/business-manage/business',
        enable: false
      },
      {
        menuId: 9,
        parentId: 7,
        name: '商机创建管理',
        url: '/business-manage/business-create-manage',
        enable: false
      },
      {
        menuId: 10,
        parentId: 7,
        name: '商机处理任务',
        url: '/business-manage/business-task',
        enable: false
      }
    ]
  },
  {
    menuId: 12,
    name: '集团客户管理',
    url: '/group-customer',
    icon: 'el-icon-service',
    enable: false,
    children: [
      {
        menuId: 13,
        parentId: 12,
        name: '集团客户总览',
        url: '/group-customer/overview',
        enable: false
      },
      {
        menuId: 14,
        parentId: 12,
        name: '集团客户创建',
        url: '/group-customer/create-manage',
        enable: false
      },
      {
        menuId: 15,
        parentId: 12,
        name: '集团客户审核',
        url: '/group-customer/audit-manage',
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

/**
 * 集团客户规模
 */
export const MEMBER_NUM = [
  {
    label: '0-20人',
    value: '1'
  },
  {
    label: '20-200人',
    value: '2'
  },
  {
    label: '200-1000人',
    value: '3'
  },
  {
    label: '1000人以上',
    value: '4'
  }
];

/**
 * 性别
 */
export const GENDER = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
];

/**
 * 年龄
 */
export const AGE_GROUPS = [
  {
    label: '25以下',
    value: '1'
  },
  {
    label: '25-30',
    value: '2'
  },
  {
    label: '30-40',
    value: '3'
  },
  {
    label: '40-50',
    value: '4'
  },
  {
    label: '50以上',
    value: '5'
  }
];

/**
 * 证件类型
 */
export const CERTIFICATE_TYPE = [
  {
    label: '营业执照',
    value: '1'
  },
  {
    label: '组织机构代码证',
    value: '2'
  },
  {
    label: '法人登记证书',
    value: '3'
  },
  {
    label: '税务登记证',
    value: '4'
  },
  {
    label: '社会保险登记证',
    value: '5'
  },
  {
    label: '统计登记证',
    value: '6'
  }
];

/**
 * 集团属性
 */
export const ORGANIZE_TYPE = [
  {
    label: '军政企业',
    value: '1'
  },
  {
    label: '省公司',
    value: '2'
  },
  {
    label: '中国移动专业公司',
    value: '3'
  }
];

/**
 * 注册资金类型
 */
export const REGISTER_FUND_TYPE = [
  {
    label: '人民币',
    value: '1'
  },
  {
    label: '美元',
    value: '2'
  }
];

/**
 * 机构类型
 */
export const ORG_INDUSTRY_TYPE = [
  {
    label: '机关法人',
    value: '1'
  },
  {
    label: '机关非法人',
    value: '2'
  },
  {
    label: '企业非法人',
    value: '3'
  },
  {
    label: '社会团体非法人',
    value: '4'
  },
  {
    label: '工会法人',
    value: '5'
  },
  {
    label: '民办非企业单位',
    value: '6'
  },
  {
    label: '企业法人',
    value: '7'
  },
  {
    label: '事业法人',
    value: '8'
  },
  {
    label: '社会团体法人',
    value: '9'
  },
  {
    label: '其他机构',
    value: '10'
  },
  {
    label: '个体工商户',
    value: '11'
  },
  {
    label: '聚类客户',
    value: '12'
  },
  {
    label: '虚拟客户',
    value: '13'
  }
];

/**
 * 行业类别
 */
export const INDUSTRY_TYPE = [
  {
    label: '农、林、牧、渔业',
    value: '1'
  },
  {
    label: '采矿业',
    value: '2'
  },
  {
    label: '制造业',
    value: '3'
  },
  {
    label: '电力、燃气及水的生产和供应业',
    value: '4'
  },
  {
    label: '建筑业',
    value: '5'
  },
  {
    label: '交通运输、仓储和邮政业',
    value: '6'
  },
  {
    label: '信息传输、计算机服务和软件业',
    value: '7'
  },
  {
    label: '批发和零售业',
    value: '8'
  },
  {
    label: '住宿和餐饮业',
    value: '9'
  },
  {
    label: '金融业',
    value: '10'
  },
  {
    label: '房地产业',
    value: '11'
  },
  {
    label: '租赁和商务服务业',
    value: '12'
  },
  {
    label: '科学研究、技术服务和地址勘查业',
    value: '13'
  },
  {
    label: '水利、环境和公共设施管理业',
    value: '14'
  },
  {
    label: '居民服务和其他服务业',
    value: '15'
  },
  {
    label: '教育',
    value: '16'
  },
  {
    label: '卫生、社会保障和社会福利业',
    value: '17'
  },
  {
    label: '文化、教育和娱乐业',
    value: '18'
  },
  {
    label: '公共管理和社会组织',
    value: '19'
  },
  {
    label: '国际组织',
    value: '20'
  }
];
