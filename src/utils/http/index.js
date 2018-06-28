import axios from 'axios';
import store from '../../store';
import { Message } from 'element-ui';

export const fetch = (url, params, method) => {
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
      } else if (String(res.data.errorInfo.code) === '200') {
        resolve(res.data);
      } else {
        // 防止防止多次执行Message，需要加一个全局message的状态
        Message({
          showClose: true,
          message: res.data.errorInfo.message,
          type: 'error'
        });
        resolve(res.data);
      }
    }).catch((err) => {
      store.commit('HIDE_PAGE_LOADING');

      // 出现400+，500+错误
      errorHandle(err);
    });
  });
};

// 错误码处理

function errorHandle(err) {
  const _Message = msg => Message({
    showClose: true,
    message: msg,
    type: 'error'
  });
  switch (err.response.status) {
    case 400:
      _Message('请求错误');
      break;

    case 401:
      _Message('未授权，请登录');
      break;

    case 403:
      // 跳转到权限提示页面
      _Message('拒绝访问');
      break;

    case 404:
      _Message(`请求地址出错: ${err.config.url}`);
      // store.commit('ROUTE_CHANGE', { path: '/404' });
      break;

    case 408:
      _Message('请求超时');
      break;

    case 500:
      _Message('服务器内部错误');
      store.commit('ROUTE_CHANGE', { path: '/500' });
      break;

    case 501:
      _Message('服务未实现');
      break;

    case 502:
      _Message('网关错误');
      break;

    case 503:
      _Message('服务不可用');
      break;

    case 504:
      _Message('网关超时');
      break;

    case 505:
      _Message('HTTP版本不受支持');
      break;

    default:
      _Message('未知错误');
  }
};
