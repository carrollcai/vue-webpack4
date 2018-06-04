import * as types from '../types';

const state = {
  username: '',
  userId: '',
  loginName: ''
};

const getters = {
  isLoggedIn(state) {
    return !!(state.userId && state.loginName && state.username)
  },
};

const mutations = {
  [types.SET_LOGIN_USER](state, data) {
    state.username = data;
  },
  [types.LOG_OUT](state) {
    state.username = '';
    state.userId = '';
    state.loginName = '';
  }
};

export default {
  state,
  getters,
  mutations
};
