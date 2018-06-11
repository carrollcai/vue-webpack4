import * as types from '../types';

const state = {
  pushList: {},
  taskList: {}
};

const mutations = {
  [types.SET_PUSH_LIST](state, data) {
    state.pushList = data;
  },
  [types.SET_TASK_LIST](state, data) {
    state.taskList = data;
  }
};

export default {
  state,
  mutations
};
