import * as types from '../types';

const state = {
  pushList: {}
};

const mutations = {
  [types.SET_PUSH_LIST](state, data) {
    state.pushList = data;
  }
};

export default {
  state,
  mutations
};
