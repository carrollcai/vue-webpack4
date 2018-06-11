import axios from 'axios';
import store from '../store';
import { Message } from 'element-ui';
import { errorHandle } from '@/utils/common';

const fetch = (url, params, method) => {
  store.commit('SHOW_PAGE_LOADING');
  return new Promise((resolve, reject) => {
    let ajx;
    if (method === 'get') {
      ajx = axios.get(url, params);
    } else if (method === 'delete') {
      ajx = axios.delete(url, params);
    } else if (method === 'put') {
      ajx = axios.put(url, params);
    } else {
      ajx = axios.post(url, params);
    }

    ajx.then(res => {
      store.commit('HIDE_PAGE_LOADING');
      
      if (res.code === 1) {
        resolve(res);
      } else {
        // 防止防止多次执行Message，需要加一个全局message的状态

        Message({
          showClose: true,
          message: res.errorCode,
          type: 'error'
        });
        reject(res);
      }
    }).catch((err) => {
      store.commit('HIDE_PAGE_LOADING');

      // 出现400+，500+错误
      errorHandle(err);
    });
  });
};
const development = 'http://localhost:3618';
const API = (url, method) => params => fetch(development + url, params, method || 'post');

// const API = (url, method = 'post') => (params = {}, config = {}) => axios[method](url, params, config);

export default {
  getDemoAPI: API('/2'),
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
