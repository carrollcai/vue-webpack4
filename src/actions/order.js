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
    return API.uploadFileAPI(params);
  },
  getOrganizeAddress: ({ commit }, params) => {
    return API.getOrganizeAddressAPI(params).then((res) => {
      commit(types.ORDER_QUERY_ORGANIZE_ADDRESS, res.data);
    });
  },
  createOrder: ({ commit }, params) => {
    return API.createOrderAPI(params).then((res) => {
      Message({
        message: '创建成功',
        type: 'success'
      });
      commit(types.ORDER_CREATE);
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/order/create-manage'
      });
    });
  },
  updateOrder: ({ commit }, params) => {
    return API.updateOrderAPI(params).then((res) => {
      Message({
        message: '修改成功',
        type: 'success'
      });
      commit(types.ORDER_CREATE);
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/order/create-manage'
      });
    });
  },
  getOrderEdit: ({ commit }, params) => {
    return API.getOrderDetailAPI(params).then(res => {
      commit(types.ORDER_GET_EDIT, res.data);
    });
  },
  getCreateManageList: ({ commit }, params) => {
    return API.getCreateManageListAPI(params).then(res => {
      commit(types.ORDER_CM_GET_LIST, res.data);
    });
  },
  getHandleTaskList: ({ commit }, params) => {
    return API.getHandleTaskListAPI(params).then(res => {
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
  },
  // 提交订单
  submitOrderRow: ({ commit }, params) => {
    return API.submitOrderRowAPI(params).then(res => {
      commit(types.ORDER_SUBMIT_ORDER_ROW, res.data);
    });
  },
  deleteOrderRow: ({ commit }, params) => {
    return API.deleteOrderRowAPI(params).then(res => {
      commit(types.ORDER_DELETE_ORDER_ROW, res.data);
    });
  },
  // 设置集团关联
  setConnectOriganize: ({ commit }, params) => {
    return API.setConnectOriganizeAPI(params);
  },
  getOrderOverviewDetail: ({ commit }, params) => {
    return API.getOrderDetailAPI(params).then(res => {
      commit(types.ORDER_OVERVIEW_GET_DETAIL, res.data);
    });
  },
  getOrderOverviewProcess: ({ commit }, params) => {
    return API.queryCustomerProcessedAPI(params).then(res => {
      commit(types.ORDER_GET_PROCESS_LIST, res.data);
    });
  },
  cancelAssign: ({ commit }, params) => {
    return API.createAssignAPI(params);
  },
  submitAssignContract: ({ commit }, params) => {
    return API.submitAssignContractAPI(params);
  }
};

export default actions;
