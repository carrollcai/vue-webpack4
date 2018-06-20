/**
 * 公共方法
 * @author carroll
 */

import { Message } from 'element-ui';
import store from '../store';

const _Message = msg => Message({
  showClose: true,
  message: msg,
  type: 'error'
});

/**
 * @export 数组里的对象类型是否有重复
 * @param {Array} arr
 * @param {String} key
 * @returns
 */
export function isRepeat(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    for (let j = i; j < arr.length; j++) {
      if (String(arr[i][key]) === String(arr[j][key])) {
        count++;
        if (count > 1) {
          return true;
        }
      }
    }
  }
};

// 判断多个规则校验是否都通过
export function checkMultRules(ref) {
  let count = 0;
  if (ref.length) {
    ref.forEach(val => {
      val.validate(valid => valid && count++);
    });

    return Boolean(count === ref.length);
  } else {
    ref.validate(valid => valid && count++);

    return Boolean(count);
  }
};

// 错误码处理
export function errorHandle(err) {
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
      store.commit('ROUTE_CHANGE', { path: '/404' });
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
