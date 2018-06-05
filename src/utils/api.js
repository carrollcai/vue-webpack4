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
        reject(res);
      } else {
        resolve(res);
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
  getProvinceAPI: API('/province')
};
