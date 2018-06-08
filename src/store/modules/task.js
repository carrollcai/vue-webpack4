import * as types from '../types';
import { PAGE_NO, PAGE_SIZE } from '@/config';

const state = {
  pushList: []
};

const mutations = {
  [types.SET_PUSH_LIST](state, data) {
    state.userList = data;
  }
};

export default {
  state,
  mutations
};
