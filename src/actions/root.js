import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  // 获取getDemo列表
  getProvince: ({ commit }, params) => {
    const req = { codeType: 'PROVINCE' };
    return API.getProvinceAPI(req).then(res => {
      commit(types.PROVINCE, res.data.PROVINCE);
    }, err => {
      if (err) {
        commit(types.PROVINCE, {});
      }
    });
  },
  getUserRole: ({ commit }, params) => {
    return API.getUserRoleAPI(params).then(res => {
      commit(types.USER_ROLE_LIST, res.data);
    });
  }
};

export default actions;
