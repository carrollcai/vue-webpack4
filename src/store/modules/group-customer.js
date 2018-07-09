import { createHelpers } from 'vuex-map-fields';
import * as types from '../types';
import {PAGE_NO, PAGE_SIZE} from '@/config';

const { getCustomerField, updateCustomerField } = createHelpers({
  getterType: 'getCustomerField',
  mutationType: 'updateCustomerField'
});

const groupCustomerCreate = {
  staffName: '',
  code: '',
  roleId: [],
  provinces: []
};

const state = {
  groupCustomerList: [],
  groupCustomerCreate: Object.cloneDeep(groupCustomerCreate),
  customerManagers: [],
  groupCustomer: {},
  customerSubscribeProducts: {},
  processes: [],
  overviewQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    organizeType: '',
    provinceId: '',
    managerName: '',
    otherField: ''
  },
  createQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    organizeType: '',
    provinceId: '',
    managerName: '',
    otherField: '',
    activeName: 'second'
  },
  auditQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    organizeType: '',
    provinceId: '',
    managerName: '',
    otherField: '',
    businessStatus: '',
    activeName: 'first'
  }
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
  },
  [types.GROUP_CUSTOMER_SUBSCRIBE_PRODUCTS](state, data) {
    state.customerSubscribeProducts = data;
  },
  [types.GROUP_CUSTOMER_PROCESSES](state, data) {
    state.processes = data;
  },
  updateCustomerField
};

const getters = {
  groupCustomer(state) {
    return state.groupCustomer;
  },
  processes(state) {
    return state.processes;
  },
  getCustomerField
};

export default {
  state,
  mutations,
  getters
};
