import * as types from '../types';

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
  customerSubscribeProducts: {}
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
