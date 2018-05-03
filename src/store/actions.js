import * as types from './types';
import API from '../utils/api';

const actions = {
  // 获取getDemo列表
  getDemo: ({ commit }, params) => {
    return API.getDemoAPI(params).then(res => {
      commit(types.DEMO_LIST, res.data.data);
    }, err => {
      if (err) {
        commit(types.DEMO_LIST, {});
      }
    });
  }
};

export default actions;
