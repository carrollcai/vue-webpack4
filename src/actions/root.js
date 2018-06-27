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
  },
  getCurrentUserInfo: ({ commit }, params) => {
    return API.getCurrentUserInfoAPI(params).then(res => {
      commit(types.CURRENT_USER_GET_INFO, res.data);
    });
  },
  queryStaticData({commit}) {
    let params = {
      'codeTypeList': [
        'ORGANIZE_TYPE',
        'ORG_INDUSTRY_TYPE',
        'industryType',
        'MEMBER_NUM',
        'CERTIFICATE_TYPE',
        'CM_MONEY_TYPE'
      ]
    };

    return API.queryStaticDataAPI(params).then(res => {
      commit(types.STATIC_DATA, res.data);
    });
  }
};

export default actions;
