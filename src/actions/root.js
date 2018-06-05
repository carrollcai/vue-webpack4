import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  // 获取getDemo列表
  getProvince: ({ commit }, params) => {
    return API.getProvinceAPI(params).then(res => {
      commit(types.PROVINCE, res.data.data);
    }, err => {
      if (err) {
        commit(types.PROVINCE, {});
      }
    });
  }
};

export default actions;
