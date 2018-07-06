import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  orderOverviewForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    date: [],
    nameOrCode: '',
    status: 0
  },
  orderOverviewObj: {
    list: [],
    totalcount: 1
  },

  orderCreateManageForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    date: [],
    nameOrCode: '',
    status: 0
  },
  orderCreateManageObj: {
    list: [],
    totalcount: 1
  },
  orderCreate: {
    ordName: '',
    predictContactAmount: null,
    predictSignDate: '',
    predictAgreement: '',
    isProjectInvitation: '1',
    organizeName: '',
    address: '',
    contactName: '',
    contactGender: '',
    contactMobile: null,
    contactEmail: '',
    busiDesc: '',
    assignReason: ''
  },

  orderHandleTaskForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    date: [],
    nameOrCode: '',
    status: 2
  },
  orderHandleTaskObj: {
    list: [],
    totalcount: 1
  },
  assignHandlers: []
};

const mutations = {
  [types.ORDER_GET_LIST](state, data) {
    state.orderOverviewObj = Object.assign(state.orderOverviewObj, data);
  },
  [types.ORDER_QUERY_ORGANIZE_ADDRESS](state, data) {

  },
  [types.ORDER_CREATE](state, data) {

  },
  [types.ORDER_CM_GET_LIST](state, data) {
    state.orderCreateManageObj = Object.assign(state.orderCreateManageObj, data);
  },
  [types.ORDER_HT_GET_LIST](state, data) {
    state.orderHandleTaskObj = Object.assign(state.orderHandleTaskObj, data);
  },
  [types.ORDER_QUERY_ASSIGN_HANDLER](state, data) {
    state.assignHandlers = data;
  }
};

export default {
  state,
  mutations
};
