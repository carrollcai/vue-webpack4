import * as types from '../store/types';
import API from '../utils/api';
import {Message} from 'element-ui';

function removeAttributs(customer) {
  // 删除不需要传的值
  delete customer.organizeTypeValue;
  delete customer.provinceName;
  delete customer.orgIndustryTypeValue;
  delete customer.industryTypeValue;
  delete customer.memberNumValue;
  delete customer.certificateTypeValue;
  delete customer.registerFundTypeValue;
  delete customer.processInsId;
  delete customer.orgTaskStatus;

  let contacts = customer.contactDtoList;
  if (contacts && contacts.length) {
    for (let contact of contacts) {
      delete contact.ageValue;
      delete contact.genderValue;
      delete contact.genderValue;
    }
  }
}

const actions = {
  /**
   * 查询集团客户总览列表
   *
   * @param {Store} Store
   * @param {String} staffName
   */
  queryCustomerOverviewList: ({commit}, params) => {
    API.queryCustomerOverviewListAPI(params).then(res => {
      commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_GET_LIST, {});
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
      commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_GET_LIST, {});
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
      commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_GET_LIST, {});
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
      Message({
        message: '创建成功',
        type: 'success',
        duration: 3000
      });
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/group-customer/create-manage'
      });
    });
  },
  /**
   *新增集团客户-提审
   * @param {Store} Store
   * @param {*} customer
   */
  createApproveCustomer({commit}, customer) {
    API.createApproveCustomerAPI(customer).then((res) => {
      Message({
        message: '创建并提审成功',
        type: 'success',
        duration: 3000
      });
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/group-customer/create-manage'
      });
    });
  },
  /**
   * 修改集团客户-保存草稿
   * @param {Store} Store
   * @param {*} customer
   */
  updateCustomer({commit}, customer) {
    removeAttributs(customer);
    API.updateCustomerAPI(customer).then((res) => {
      Message({
        message: '修改成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/group-customer/create-manage'
      });
    });
  },
  /**
   * 修改集团客户-立即提审
   * @param {Store} Store
   * @param {*} customer
   */
  editApproveCustomer({commit}, customer) {
    removeAttributs(customer);

    API.editApproveCustomerAPI(customer).then((res) => {
      Message({
        message: '修改并提审成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/group-customer/create-manage'
      });
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
      commit(types.GROUP_CUSTOMER_DETAIL, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_DETAIL, {});
    });
  },
  /**
   * 查询集团客户 快照
   * @param {Store} Store
   * @param {Number} customerId 集团客户ID
   */
  queryCustomerSnapshot({commit}, customerId) {
    return API.queryCustomerSnapshotAPI({
      organizeId: customerId
    }).then((res) => {
      commit(types.GROUP_CUSTOMER_DETAIL, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_DETAIL, {});
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
    }).then(() => {
      Message({
        showClose: true,
        message: '您已成功删除该条集团客户信息！',
        type: 'success',
        duration: 3000
      });
    });
  },
  /**
   * 集团客户创建列表-提审
   * @param {Store} Store
   * @param {Number} customerId 集团客户ID
   */
  approveCustomer({commit}, customerId) {
    return API.approveCustomerAPI({
      id: customerId
    }).then((res) => {
      Message({
        showClose: true,
        message: '您已成功提审该条集团客户信息！',
        type: 'success',
        duration: 3000
      });
    });
  },
  /**
   * 审核集团客户
   * @param {Object} Store
   * @param {Object} params 参数
   */
  auditCustomer({commit}, params) {
    return API.auditCustomerAPI(params).then((res) => {
      Message({
        message: '审核成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/group-customer/audit-manage'
      });
    });
  },
  /**
   * 集团客户总览-查看主页-查询订购产品
   * @param {Object} Store
   * @param {Object} params 参数
   */
  querySubscribeProducts({commit}, params) {
    API.querySubscribeProductsAPI(params).then(res => {
      commit(types.GROUP_CUSTOMER_SUBSCRIBE_PRODUCTS, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_SUBSCRIBE_PRODUCTS, {});
    });
  },
  /**
   * 查询审核集团客户流程
   */
  queryProcesses({commit}, processInsId) {
    API.queryCustomerProcessedAPI({
      processInsId
    }).then(res => {
      commit(types.GROUP_CUSTOMER_PROCESSES, res.data);
    }, () => {
      commit(types.GROUP_CUSTOMER_PROCESSES, []);
    });
  }
};

export default actions;
