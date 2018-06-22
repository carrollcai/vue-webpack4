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
    totalcount: 1,
    staffName: '',
    code: '',
    roleId: ''
  },
  groupCustomerCreate: Object.cloneDeep(groupCustomerCreate)
};

const mutations = {
  [types.GROUP_CUSTOMER_INIT_FORM](state, data) {
    state.groupCustomerCreate = Object.cloneDeep(groupCustomerCreate);
  },
  [types.GROUP_CUSTOMER_GET_LIST](state, data) {
    state.groupCustomerList = data;
    state.groupCustomerForm.totalcount = data.totalcount;
  },
  [types.GROUP_CUSTOMER_GET_INFO](state, data) {
    state.groupCustomerCreate = data;
  }
};

export default {
  state,
  mutations
};
