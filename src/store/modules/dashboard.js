import * as types from '../types';

const state = {
  homeModule: '',
  homeModuleFromMenu: '',
  updateHomeModuleStatus: '',
  homeBusinessList: '',
  homeOrderList: '',
  homeQueryTaskInfoOrangize: '',
  homeQueryTaskInfoOrder: '',
  homeQueryTaskInfoBusiness: '',
  homeQueryTaskInfoRequire: '',
  homeQueryTaskInfoVisit: '',
  homeQueryOrganizeInfo: ''
};

const getters = {
  getActiveNav(state, getters, rootState) {
    return window.location.href.split('#/')[1];
  }
};

const mutations = {
  [types.HOME_MODULE](state, data) {
    state.homeModule = data.secOperatorDTO.homeModule;
  },
  [types.HOME_MODULE_FROM_MENU](state, data) {
    state.homeModuleFromMenu = data.secOperatorDTO.homeModuleFromMenu;
  },
  [types.UPDATE_HOME_MODULE_STATUS](state, data) {
    state.updateHomeModuleStatus = data;
  },
  [types.HOME_BUSINESS_LIST](state, data) {
    state.homeBusinessList = data;
  },
  [types.HOME_ORDER_LIST](state, data) {
    state.homeOrderList = data;
  },
  [types.HOME_QUERY_TASK_INFO_ORANGIZE](state, data) {
    state.homeQueryTaskInfoOrangize = data;
  },
  [types.HOME_QUERY_TASK_INFO_ORDER](state, data) {
    state.homeQueryTaskInfoOrder = data;
  },
  [types.HOME_QUERY_TASK_INFO_BUSINESS](state, data) {
    state.homeQueryTaskInfoBusiness = data;
  },
  [types.HOME_QUERY_TASK_INFO_REQUIRE](state, data) {
    state.homeQueryTaskInfoRequire = data;
  },
  [types.HOME_QUERY_TASK_INFO_VISIT](state, data) {
    state.homeQueryTaskInfoVisit = data;
  },
  [types.HOME_QUERY_ORGANIZE_INFO](state, data) {
    state.homeQueryOrganizeInfo = data;
  }
};

export default {
  state,
  getters,
  mutations
};
