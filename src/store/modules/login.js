import Cookies from 'js-cookie';
import * as types from '../types';
import { SESSION_DURATION } from '@/config';

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

    Cookies.set('token', new Date().getTime(), { expires: SESSION_DURATION });
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
