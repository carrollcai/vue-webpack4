import * as types from '../store/types';
import API from '../utils/api';
import {Message} from 'element-ui';

function isSuccess(res) {
  return res.errorInfo && res.errorInfo.code && res.errorInfo.code === '200';
}

const actions = {
  getGroupCustomerList: ({commit}, params) => {
    return API.getGroupCustomerListAPI(params).then(res => {
      commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
    });
  },
  generateContactId: () => {
    return API.generateContactIdAPI();
  },
  queryCustomerManagers({commit}, staffName) {
    return API.queryCustomerManagerAPI({staffName});
  },
  createCustomer({commit}, customer) {
    API.createCustomerAPI(customer).then((res) => {
      if (isSuccess(res)) {
        Message({
          message: '创建成功',
          type: 'success',
          duration: 3000
        });
        // 创建成功
        commit(types.ROUTE_CHANGE, {
          path: '/group-customer/create-manage'
        });
      }
    });
  },
  createApproveCustomer({commit}, customer) {
    API.createApproveCustomerAPI(customer).then((res) => {
      if (isSuccess(res)) {
        Message({
          message: '创建并提审成功',
          type: 'success',
          duration: 3000
        });
        // 创建成功
        commit(types.ROUTE_CHANGE, {
          path: '/group-customer/create-manage'
        });
      }
    });
  },
  queryCustomer({commit}, customerId) {
    return API.queryCustomerAPI({
      organizeId: customerId
    }).then((res) => {
      if (isSuccess(res)) {
        commit(types.GROUP_CUSTOMER_DETAIL, res.data);
      } else {
        commit(types.GROUP_CUSTOMER_DETAIL, {});
      }
    });
  },
  deleteCustomer({commit}, customerId) {
    return API.deleteCustomerAPI({
      organizeId: customerId
    }).then((res) => {
      if (isSuccess(res)) {
        Message({
          showClose: true,
          message: '删除成功',
          type: 'success',
          duration: 3000
        });
      }
    });
  },
  approveCustomer({commit}, customerId) {
    return API.approveCustomerAPI(customerId).then((res) => {
      if (isSuccess(res)) {
        Message({
          showClose: true,
          message: '提审成功',
          type: 'success',
          duration: 3000
        });
      }
    });
  }
};

export default actions;
