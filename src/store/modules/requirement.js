import * as types from '../types';

const state = {
  requirementList: {},
  requirement: {}
};

const mutations = {
  [types.REQUIREMENT_GET_LIST](state, data) {
    state.requirementList = data;
  },
  [types.REQUIREMENT_GET_INFO](state, data) {
    state.requirement = data;
  }
};

const getters = {
  requirement(state) {
    return state.requirement;
  }
};

export default {
  state,
  mutations,
  getters
};
