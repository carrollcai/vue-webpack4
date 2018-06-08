import * as types from '../store/types';
import API from '../utils/api';
import router from '@/router';

const actions = {
  login({ commit }, params = {}) {
    return new Promise((resolve, reject) => {
      API.loginApi(params).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  },
  logout({ commit, dispatch }, params = {}) {
    API.logoutApi(params).then((res) => {
      commit(types.LOG_OUT);
      dispatch('toLoginPage');
    }, () => {
      commit(types.LOG_OUT);
      dispatch('toLoginPage');
    });
  },
  resetPwd: ({ commit }, params = {}) => {
    return new Promise((resolve, reject) => {
      API.resetPwdApi(params).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  },
  toLoginPage() {
    router.replace('/login');
  }
};

export default actions;
