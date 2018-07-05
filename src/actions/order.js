import * as types from '../store/types';
import API from '../utils/api';
import { Message } from 'element-ui';

const actions = {
  getOrderList: ({ commit }, params) => {
    return API.getOrderListAPI().then((res) => {
      commit(types.ORDER_GET_LIST, res.data);
    });
  },
  uploadOrderHandleTask: ({ commit }, params) => {
    return API.uploadOrderHandleTaskAPI(params).then((res) => {
      console.log('上传成功');
    });
  },
  queryOrganizeAddress: ({ commit }, params) => {
    return API.queryOrganizeAddressAPI(params).then((res) => {
      commit(types.ORDER_QUERY_ORGANIZE_ADDRESS, res);
    });
  },
  createOrder: ({ commit }, params) => {
    return API.createOrderAPI(params).then((res) => {
      Message({
        message: '创建成功',
        type: 'success'
      });
      commit(types.ORDER_CREATE);
    });
  },
  getOrderEdit: ({ commit }, params) => {
    return API.getOrderDetailAPI(params).then(res => {
      commit(types.ORDER_GET_DETAIL);
    });
  }
};

export default actions;
