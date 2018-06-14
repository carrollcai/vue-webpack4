import * as types from '../types';

const state = {
  province: [],
  userRoleList: [],
  currentRoute: {
    path: ''
  },
  pageLoading: false,
  // 全局message状态控制
  globalMessageStatus: false
};

const mutations = {
  [types.PROVINCE](state, data) {
    state.province = data.map(val => {
      return {
        key: val.codeValue,
        value: val.codeName
      };
    });
  },
  [types.USER_ROLE_LIST](state, data) {
    state.userRoleList = data;
  },
  // 改变当前路由
  [types.ROUTE_CHANGE](state, data) {
    state.currentRoute = data;
  },
  [types.SHOW_PAGE_LOADING](state) {
    state.pageLoading = true;
  },
  [types.HIDE_PAGE_LOADING](state) {
    state.pageLoading = false;
  }
};

export default {
  state,
  mutations
};
