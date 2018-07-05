import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  orderOverviewForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    totalcount: 1,
    date: [],
    nameOrCode: ''
  },
  orderList: [],

  orderCreate: {
    ordName: '',
    predictContactAmount: null,
    predictSignDate: '',
    predictAgreement: '',
    isProjectInvitation: 1,
    organizeName: '',
    address: '',
    contactName: '',
    contactGender: '',
    contactMobile: null,
    contactEmail: '',
    busiDesc: '',
    assignReason: ''
  }
};

const mutations = {
  [types.ORDER_GET_LIST](state, data) {
    state.orderList = data.list;
    state.orderOverviewForm.totalcount = data.totalcount;
  },
  [types.ORDER_QUERY_ORGANIZE_ADDRESS](state, data) {

  },
  [types.ORDER_CREATE](state, data) {

  }
};

export default {
  state,
  mutations
};
