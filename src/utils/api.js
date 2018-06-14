import axios from 'axios';
import store from '../store';
import { Message } from 'element-ui';
import { errorHandle } from '@/utils/common';
// import qs from 'qs';
const fetch = (url, params, method) => {
  // stringify会自动转码
  // params = qs.parse('beginDate=2018-06-01&endDate=2018-06-01&clientType=咪咕阅读&memberType=黄金&startRow=0&pageSize=10&provinces=江苏&provinces=安徽&provinces=广东');

  // params = qs.stringify(params);

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

      if (res.data.errorInfo.code === '401') {
        store.commit('ROUTE_CHANGE', { path: '/login' });
      }
      if (String(res.data.errorInfo.code) === '200') {
        resolve(res.data);
      } else {
        // 防止防止多次执行Message，需要加一个全局message的状态

        Message({
          showClose: true,
          message: res.data.errorInfo.message,
          type: 'error'
        });
        reject(res.data);
      }
    }).catch((err) => {
      store.commit('HIDE_PAGE_LOADING');

      // 出现400+，500+错误
      errorHandle(err);
    });
  });
};
// const development = 'http://localhost:3618';
const development = '';
const API = (url, method) => params => fetch(development + url, params, method || 'post');

// const API = (url, method = 'post') => (params = {}, config = {}) => axios[method](url, params, config);

export default {
  getDemoAPI: API('/demo'),

  getProvinceAPI: API('/esop/secBranch/queryStaticData'),

  getRoleListAPI: API('/esop/role/queryRole'),
  getRoleInfoAPI: API('/esop/role/getRoleById'),
  createRoleAPI: API('/esop/role/createRole'),
  updateRoleAPI: API('/esop/role/updateRoleById'),
  deleteRoleAPI: API('/esop/role/deleteRoleById'),

  // getPermissionsAPI: API('/permissions'),
  getUserRoleAPI: API('/esop/role/queryRoleAll'),

  getUserListAPI: API('/esop/operator/queryOperator'),
  getUserInfoAPI: API('/esop/operator/queryById'),
  createUserAPI: API('/esop/operator/saveOperator'),
  updateUserAPI: API('/esop/operator/updateInfo'),
  deleteUserAPI: API('/esop/operator/deleteInfo'),

  /* 数据分析 */

  // 查询分月新增会员活跃用户数
  getMembersAPI: API('/esop/analysisReport/queryPDNNs'),
  // 分省日活跃用户数
  getDailyActiveUserAPI: API('/esop/analysisReport/queryPDARs'),

  // 活跃度分析日活跃数查询
  getTrendListAPI: API('/esop/analysisReport/queryPDARs'),
  // 活跃度分析新增会员查询
  getTrendNewMembersAPI: API('/esop/analysisReport/queryPDNNs'),

  // 各省日活跃用户情况
  getProvinceUserAPI: API('/esop/analysisReport/queryPDARs'),

  // 上个月新增本月存留
  // getLastMonthRetLossUserAPI: ('/esop/analysisReport/queryMNRNs'),
  // 上个月新增本月

  // 月留存流失
  getRetentionLossUserAPI: API('/esop/analysisReport/queryMDRs'),

  // getRetTrendListAPI: API('/retention/trend'),

  loginApi: API('/esop/login/server'),
  logoutApi: API('/esop/login/logout'),
  resetPwdApi: API('/esop/secBranch/editPassword')
};
