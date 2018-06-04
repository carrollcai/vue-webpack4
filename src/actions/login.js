import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  resetPwd: ({ commit }, params) => {
    return new Promise((resolve, reject) => {
      API.getDemoAPI(params).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  },
  login({ commit }, params) {
  }
};

export default actions;
