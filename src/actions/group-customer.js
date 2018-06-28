import * as types from '../store/types';
import API from '../utils/api';
import {Message} from 'element-ui';

function isSuccess(res) {
  return res.errorInfo && res.errorInfo.code && res.errorInfo.code === '200';
}

const actions = {
  /**
   * 查询集团客户创建列表
   *
   * @param {Store} Store
   * @param {String} staffName
   */
  queryCustomerOverviewList: ({commit}, params) => {
    API.queryCustomerOverviewListAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
      } else {
        commit(types.GROUP_CUSTOMER_GET_LIST, {});
      }
    });
  },
  /**
   * 查询集团客户创建列表
   *
   * @param {Store} Store
   * @param {String} staffName
   */
  getGroupCustomerList: ({commit}, params) => {
    API.getGroupCustomerListAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
      } else {
        commit(types.GROUP_CUSTOMER_GET_LIST, {});
      }
    });
  },
  /**
   * 查询集团客户审核列表
   *
   * @param {Store} Store
   * @param {String} staffName
   */
  queryCustomerAuditList: ({commit}, params) => {
    API.queryCustomerAuditListAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
      } else {
        console.log('---------');
        commit(types.GROUP_CUSTOMER_GET_LIST, {});
      }
    });
  },
  /**
   * 生成 集团客户联系人ID
   */
  generateContactId: () => {
    return API.generateContactIdAPI();
  },
  /**
   * 新增集团客户-查询客户经理
   *
   * @param {Store} Store
   * @param {String} staffName
   */
  queryCustomerManagers({commit}, staffName) {
    return API.queryCustomerManagerAPI({staffName});
  },
  /**
   * 新增集团客户-保存草稿
   * @param {Store} Store
   * @param {*} customer
   */
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
  /**
   *新增集团客户-提审
   * @param {Store} Store
   * @param {*} customer
   */
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
  /**
   * 修改集团客户-保存草稿
   * @param {Store} Store
   * @param {*} customer
   */
  updateCustomer({commit}, customer) {
    // 删除不需要传的值

    delete customer.organizeTypeValue;
    delete customer.provinceName;
    delete customer.orgIndustryTypeValue;
    delete customer.industryTypeValue;
    delete customer.memberNumValue;
    delete customer.certificateTypeValue;
    delete customer.registerFundTypeValue;

    let contacts = customer.contactDtoList;
    if (contacts && contacts.length) {
      for (let contact of contacts) {
        delete contact.ageValue;
        delete contact.genderValue;
        delete contact.genderValue;
      }
    }

    API.updateCustomerAPI(customer).then((res) => {
      if (isSuccess(res)) {
        Message({
          message: '修改成功',
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
  /**
   * 查询集团客户详情
   * @param {Store} Store
   * @param {Number} customerId 集团客户ID
   */
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
  /**
   * 删除集团客户
   * @param {Store} Store
   * @param {Number} customerId 集团客户ID
   */
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
  /**
   * 集团客户创建列表-提审
   * @param {Store} Store
   * @param {Number} customerId 集团客户ID
   */
  approveCustomer({commit}, customerId) {
    return API.approveCustomerAPI({
      organizeId: customerId
    }).then((res) => {
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
