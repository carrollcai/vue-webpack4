import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  // 获取getDemo列表
  // getDemo: ({ commit }, params) => {
  //   return API.getDemoAPI(params).then(res => {
  //     commit(types.DEMO_LIST, res.data);
  //   }, err => {
  //     if (err) {
  //       commit(types.DEMO_LIST, {});
  //     }
  //   });
  // }
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
  }
};

export default actions;
