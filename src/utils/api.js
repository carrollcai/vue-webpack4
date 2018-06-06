import axios from 'axios';

const fetch = (url, params, method) => {
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
      if (res.code === 1) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      console.log(err);
      if (err) return err;
    });
  });
};

const development = 'http://localhost:3618';
const API = (url, method) => params => fetch(development + url, params, method || 'post');

export default {
  getDemoAPI: API('/demo'),
  getProvinceAPI: API('/province'),
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
  queryActiveFormAPI: API('/client'),

  loginApi: API('/login', 'post'),
  logoutApi: API('/logout', 'post'),
  resetPwdApi: API('/resetPwd', 'post')
};
