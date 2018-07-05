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
  }
};

const mutations = {
  [types.ORDER_GET_LIST](state, data) {
    state.orderOverviewObj = Object.assign(state.orderOverviewObj, data);
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
