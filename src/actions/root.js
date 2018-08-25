import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getProvince({ commit }, params) {
    const req = { codeType: 'PROVINCE' };
    return API.getProvinceAPI(req).then(res => {
      commit(types.PROVINCE, res.data.PROVINCE);
    }, err => {
      if (err) {
        commit(types.PROVINCE, {});
      }
    });
  },
  getUserRole({ commit }, params) {
    return API.getUserRoleAPI(params).then(res => {
      commit(types.USER_ROLE_LIST, res.data);
    });
  },
  getCurrentUserInfo({ commit }, params) {
    return API.getCurrentUserInfoAPI(params).then(res => {
      commit(types.CURRENT_USER_GET_INFO, res.data);
    });
  },
  queryStaticData({ commit }) {
    let params = {
      'codeTypeList': [
        'ORGANIZE_TYPE',
        'ORG_INDUSTRY_TYPE',
        'INDUSTRY_TYPE',
        'MEMBER_NUM',
        'CERTIFICATE_TYPE',
        'CM_MONEY_TYPE',
        'SEX',
        'AGE',
        'MARITAL_STATUS',
        // 订单模块
        'ORD_STATUS',
        'PROJECT_INVITATION',
        'PREDICT_AGREEMENT_TIME',
        // 商机模块
        'WEATHER', // 是否
        'BIZ_OPPOR_TYPE', // 商机类别
        'BIZ_OPPOR_STATUS', // 商机状态
        'PREDICT_AGREEMENT_TIME', // 预计协议期
        // 数据提取管理
        'CLIENT_TYPE',
        'CHANNEL_TYPE',
        'MEMBER_TYPE',
        'EXTRACT_AGE',
        'NET_TYPE',
        'CONTENT',
        'REGION'
      ]
    };
    return API.queryStaticDataAPI(params).then(res => {
      commit(types.STATIC_DATA, res.data);
    });
  },
  getNewFileInputId({ commit }, params) {
    return API.getNewFileInputIdAPI(params).then(res => {
      return res.data;
    });
  },
  goFirstPage({ commit, state }, params) {
    const path = state.root.getFirstPageRoute;
    commit(types.ROUTE_CHANGE, {
      path
    });
  },
  async getSystemInfo({ commit, dispatch }, params) {
    await dispatch('getProvince');
    await dispatch('getCurrentUserInfo');
    // 获取用户信息后添加动态路由
    commit('ADD_ROUTES');
    dispatch('queryStaticData');
  }
};

export default actions;
