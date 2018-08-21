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
    otherField: '',
    label: ''
  },
  createQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    organizeType: '',
    provinceId: '',
    managerName: '',
    otherField: '',
    activeName: 'first'
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
  },
  tagLibraryList: '',
  groupNameList: [],
  groupCustomerManagerList: []
};

const mutations = {
  [types.GROUP_CUSTOMER_INIT_FORM](state, data) {
    state.groupCustomerCreate = Object.cloneDeep(groupCustomerCreate);
  },
  [types.GROUP_CUSTOMER_GET_LIST](state, data) {
    let groupList = data;
    if (groupList) {
      groupList.list.map(val => {
        let labelArr = [];
        if (val.label && val.label.indexOf('#') !== -1) {
          labelArr = val.label.split('#');
          labelArr.shift();
          val.label = labelArr;
        }
      });
    }
    state.groupCustomerList = groupList;
  },
  [types.GROUP_CUSTOMER_GET_INFO](state, data) {
    state.groupCustomerCreate = data;
  },
  [types.GROUP_CUSTOMER_MANAGERS](state, data) {
    state.customerManagers = data;
  },
  [types.GROUP_CUSTOMER_DETAIL](state, data) {
    // 需要将时间转为Date对象，否则无法修改
    data.establishTime = new Date(data.establishTime);

    state.groupCustomer = data;
  },
  [types.GROUP_CUSTOMER_SUBSCRIBE_PRODUCTS](state, data) {
    state.customerSubscribeProducts = data;
  },
  [types.GROUP_CUSTOMER_PROCESSES](state, data) {
    state.processes = data;
  },
  updateCustomerField,
  [types.TAG_LIBRARY_LIST](state, data) {
    state.tagLibraryList = data;
  },
  [types.GROUP_NAME_LIST](state, data) {
    state.groupNameList = data.map(val => Object.assign(val, {value: val.organizeName}));
  },
  [types.GROUP_CUSTOMER_MANAGERS](state, data) {
    state.groupCustomerManagerList = data.map(val => Object.assign(val, {value: val.staffName}));
  }
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
