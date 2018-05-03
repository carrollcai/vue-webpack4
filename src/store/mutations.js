import * as types from './types';

const state = {
  demoList: []
};

const mutations = {
  [types.DEMO_LIST](state, data) {
    state.demoList = data;
  }
};

export default {
  state,
  mutations
};
