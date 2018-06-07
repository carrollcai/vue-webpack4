import Vue from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/config';

Vue.axios = axios;

axios.defaults.baseURL = BASE_URL;

// request interceptor
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// response interceptor
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  }
);
