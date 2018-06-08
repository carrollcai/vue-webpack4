import axios from 'axios';

const API = (url, method = 'post') => (params = {}, config = {}) => axios[method](url, params, config);

export default {
  getDemoAPI: API('/demo'),
  getProvinceAPI: API('/province/list'),
  getRoleListAPI: API('/role/list'),
  getRoleInfoAPI: API('/role/info'),
  createRoleAPI: API('/role/info'),
  deleteRoleAPI: API('/role/info'),
  getPermissionsAPI: API('/permissions'),
  getUserListAPI: API('/user/list'),
  getUserRoleAPI: API('/user/role/list'),
  createUserAPI: API('/user/role/list'),
  deleteUserAPI: API('/user/role/list'),
  getClientAPI: API('/client'),

  /* 数据分析 */
  getDailyActiveUserAPI: API('/active/dailyLive'),
  getTrendListAPI: API('/trend/list'),
  getMembersAPI: API('/member'),
  getProvinceUserAPI: API('/province/user'),
  getRetentionLossUserAPI: API('/retention/user'),
  getRetTrendListAPI: API('/retention/trend'),

  loginApi: API('/login'),
  logoutApi: API('/logout'),
  resetPwdApi: API('/resetPwd')
};
