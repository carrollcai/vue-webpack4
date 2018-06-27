import * as types from '../types';
import {PAGE_NO, PAGE_SIZE} from '@/config';

const groupCustomerCreate = {
  staffName: '',
  code: '',
  roleId: [],
  provinces: []
};

const state = {
  groupCustomerList: [],
  groupCustomerForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    organizeType: '',
    provinceId: '',
    managerName: '',
    otherField: ''
  },
  groupCustomerCreate: Object.cloneDeep(groupCustomerCreate),
  customerManagers: [],
  groupCustomer: {}
};

const mutations = {
  [types.GROUP_CUSTOMER_INIT_FORM](state, data) {
    state.groupCustomerCreate = Object.cloneDeep(groupCustomerCreate);
  },
  [types.GROUP_CUSTOMER_GET_LIST](state, data) {
    state.groupCustomerList = data;
  },
  [types.GROUP_CUSTOMER_GET_INFO](state, data) {
    state.groupCustomerCreate = data;
  },
  [types.GROUP_CUSTOMER_MANAGERS](state, data) {
    state.customerManagers = data;
  },
  [types.GROUP_CUSTOMER_DETAIL](state, data) {
    state.groupCustomer = data;
  }
};

const getters = {
  groupCustomer(state) {
    return state.groupCustomer;
  }
};

export default {
  state,
  mutations,
  getters
};
