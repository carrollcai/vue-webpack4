import * as types from '../types';

const state = {
  roleObj: []
};

const mutations = {
  [types.ROLE_LIST](state, data) {
    state.roleObj = data;
  }
};

export default {
  state,
  mutations
};
