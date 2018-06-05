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
  },
  getPermissions: ({ commit }, params) => {
    return API.getPermissionsAPI(params).then(res => {
      commit(types.PERMISSIONS, res.data);
    });
  },
  getUserList: ({ commit }, params) => {
    return API.getUserListAPI(params).then(res => {
      commit(types.USER_GET_LIST, res.data);
    });
  },
  createUser: ({ commit }, params) => {
    return API.createUserAPI(params).then(res => {
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/system/user/management'
      });
    });
  }
};

export default actions;
