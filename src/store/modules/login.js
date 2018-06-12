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
    let user = data.secOperatorDTO;
    state.username = user.code;
    state.userId = user.operatorId;
    state.loginName = user.code;
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
