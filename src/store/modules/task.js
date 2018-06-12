import * as types from '../types';

const state = {
  pushList: {},
  taskList: {},
  todoList: {}
};

const mutations = {
  [types.SET_PUSH_LIST](state, data) {
    state.pushList = data;
  },
  [types.SET_TASK_LIST](state, data) {
    state.taskList = data;
  },
  [types.SET_TODO_LIST](state, data) {
    state.todoList = data;
  }
};

export default {
  state,
  mutations
};
