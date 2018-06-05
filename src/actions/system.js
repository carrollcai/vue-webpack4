import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  // 获取getDemo列表
  getRoleList: ({ commit }, params) => {
    return API.getRoleListAPI(params).then(res => {
      commit(types.ROLE_LIST, res.data);
    }, err => {
      if (err) {
        commit(types.ROLE_LIST, {});
      }
    });
  },
  getRoleInfo: ({ commit }, params) => {
    return API.getRoleInfoAPI(params).then(res => {
      commit(types.ROLE_GET_INFO, res.data);
    }, err => {
      if (err) commit(types.ROLE_GET_INFO, {});
    });
  }
};

export default actions;
