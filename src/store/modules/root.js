import * as types from '../types';

const state = {
  province: [],
  userRoleList: [],
  currentRoute: {
    path: ''
  }
};

const mutations = {
  [types.PROVINCE](state, data) {
    state.province = data;
  },
  [types.USER_ROLE_LIST](state, data) {
    state.userRoleList = data;
  },
  // 改变当前路由
  [types.ROUTE_CHANGE](state, data) {
    state.currentRoute = data;
  }
};

export default {
  state,
  mutations
};
