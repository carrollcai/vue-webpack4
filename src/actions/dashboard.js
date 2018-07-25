import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  // 获取当前用户信息
  queryCurrentOperator: ({ commit }, params) => {
    return API.queryCurrentOperatorAPI(params).then(res => {
      commit(types.HOME_MODULE, res.data);
      commit(types.HOME_MODULE_FROM_MENU, res.data);
      return res.data.secOperatorDTO;
    });
  },
  // 更新用户首页设置标志位
  updateHomeModule: ({ commit }, params) => {
    return API.updateHomeModuleAPI(params).then(res => {
      commit(types.UPDATE_HOME_MODULE_STATUS, res.data);
      return res;
    });
  },
  // 首页（商机）
  getHomeBusinessList: ({ commit }, params) => {
    return API.getHomeBusinessListAPI(params).then(res => {
      commit(types.HOME_BUSINESS_LIST, res.data.list);
    });
  },
  // 首页（订单）
  getHomeOrderList: ({ commit }, params) => {
    return API.getHomeOrderListAPI(params).then(res => {
      commit(types.HOME_ORDER_LIST, res.data.list);
    });
  },
  // 我的处理任务集团
  queryTaskInfoOrangize: ({ commit }, params) => {
    return API.queryTaskInfoAPI(params).then(res => {
      commit(types.HOME_QUERY_TASK_INFO_ORANGIZE, res.data);
    });
  },
  // 我的处理任务订单
  queryTaskInfoOrder: ({ commit }, params) => {
    return API.queryTaskInfoAPI(params).then(res => {
      commit(types.HOME_QUERY_TASK_INFO_ORDER, res.data);
    });
  },
  // 我的处理任务商机
  queryTaskInfoBusiness: ({ commit }, params) => {
    return API.queryTaskInfoAPI(params).then(res => {
      commit(types.HOME_QUERY_TASK_INFO_BUSINESS, res.data);
    });
  },
  // 我的处理任务需求
  queryTaskInfoRequire: ({ commit }, params) => {
    return API.queryTaskInfoAPI(params).then(res => {
      commit(types.HOME_QUERY_TASK_INFO_REQUIRE, res.data);
    });
  },
  // 我的处理任务走访
  queryTaskInfoVisit: ({ commit }, params) => {
    return API.queryTaskInfoAPI(params).then(res => {
      commit(types.HOME_QUERY_TASK_INFO_VISIT, res.data);
    });
  },
  // 首页集团查询
  queryOrganizeInfo: ({ commit }, params) => {
    return API.queryOrganizeInfoAPI(params).then(res => {
      commit(types.HOME_QUERY_ORGANIZE_INFO, res.data.list);
    });
  }
};

export default actions;
