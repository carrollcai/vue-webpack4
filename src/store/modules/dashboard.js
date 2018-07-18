import * as types from '../types';

const state = {
  demoList: [],
  homeModule: '',
  homeModuleFromMenu: '',
  updateHomeModuleStatus: '',
  homeBusinessList: '',
  homeOrderList: ''
};

const getters = {
  getActiveNav(state, getters, rootState) {
    return window.location.href.split('#/')[1];
  }
};

const mutations = {
  [types.DEMO_LIST](state, data) {
    state.demoList = data;
  },
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
  }
};

export default {
  state,
  getters,
  mutations
};
