import * as types from '../store/types';
import API from '../utils/api';
import router from '@/router';

function isSuccess(res) {
  return res && res.code === 1;
}

const actions = {
  login({ commit }, params = {}) {
    return new Promise((resolve, reject) => {
      API.loginApi(params).then(res => {
        if (isSuccess(res)) {
          commit(types.SET_LOGIN_USER, res.data);
          router.replace('/');
          resolve(res);
        } else {
          reject(res);
        }
      }, err => {
        reject(err);
      });
    });
  },
  logout({ commit }, params = {}) {
    API.logoutApi(params).then((res) => {
      commit(types.LOG_OUT);
      router.replace('/login');
    }, () => {
      commit(types.LOG_OUT);
      router.replace('/login');
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
  }
};

export default actions;
