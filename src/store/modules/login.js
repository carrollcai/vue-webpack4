import * as types from '../types';

const state = {
  username: '',
  userId: '',
  loginName: ''
};

const getters = {
  isLoggedIn(state) {
    return !!(state.userId && state.loginName && state.username);
  },
  username(state) {
    return state.username;
  },
  userId(state) {
    return state.userId;
  }
};

const mutations = {
  [types.SET_LOGIN_USER](state, data) {
    state.username = data.username;
    state.userId = data.userId;
    state.loginName = data.loginName;
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
