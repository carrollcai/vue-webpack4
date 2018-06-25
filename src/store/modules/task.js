import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  taskForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    totalcount: 1,
    date: [],
    name: '',
    status: null
  },
  taskList: [],

  pushList: {},
  todoList: {}
};

const mutations = {
  [types.TASK_QUERY_LIST](state, data) {
    state.taskList = data.list;
    state.taskForm.totalcount = data.totalcount;
  },
  [types.SET_PUSH_LIST](state, data) {
    state.pushList = data;
  },
  [types.SET_TODO_LIST](state, data) {
    state.todoList = data;
  }
};

export default {
  state,
  mutations
};
