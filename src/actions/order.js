import * as types from '../store/types';
import API from '../utils/api';
import { Message } from 'element-ui';

const actions = {
  getOrderList: ({ commit }, params) => {
    return API.getOrderListAPI(params).then((res) => {
      commit(types.ORDER_GET_LIST, res.data);
    });
  },
  overviewSignHandle: ({ commit }, params) => {
    return API.overviewSignHandleAPI(params).then((res) => {
      commit(types.ORDER_OV_SIGN_HANDLE, res.data);
    });
  },
  uploadOrderHandleTask: ({ commit }, params) => {
    return API.uploadOrderHandleTaskAPI(params).then((res) => {
      console.log('上传成功');
    });
  },
  getOrganizeAddress: ({ commit }, params) => {
    return API.getOrganizeAddressAPI(params).then((res) => {
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
  },
  getCreateManageList: ({ commit }, params) => {
    return API.getOrderListAPI(params).then(res => {
      commit(types.ORDER_CM_GET_LIST, res.data);
    });
  },
  getHandleTaskList: ({ commit }, params) => {
    return API.getOrderListAPI(params).then(res => {
      commit(types.ORDER_HT_GET_LIST, res.data);
    });
  },
  // 指派处理人
  getAssignhandler: ({ commit }, params) => {
    return API.getAssignhandlerAPI(params).then(res => {
      commit(types.ORDER_QUERY_ASSIGN_HANDLER, res.data);
    });
  },
  // 创建分派
  createAssign: ({ commit }, params) => {
    return API.createAssignAPI(params).then(res => {
      // 请求成功后需要刷新视图
      Message({
        message: '分派成功',
        type: 'success'
      });
    });
  },
  getHandleTaskDetail: ({ commit }, params) => {
    return API.getOrderDetailAPI(params).then(res => {
      commit(types.ORDER_GET_HANDLE_TASK_DETAIL, res.data);
    });
  }
};

export default actions;
